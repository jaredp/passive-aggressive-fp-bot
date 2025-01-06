import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";
import { verify } from "@octokit/webhooks-methods";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-hub-signature-256");

  // Verify webhook signature
  try {
    await verify(process.env.GITHUB_WEBHOOK_SECRET!, body, signature || "");
  } catch (_err) {
    console.error("Invalid signature", _err);
    return new Response("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(body);
  const relevant_action = ["opened", "synchronize", "edited"].includes(
    payload.action
  );
  if (!relevant_action) {
    return new Response("Not a PR event", { status: 200 });
  }

  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_PRIVATE_KEY!,
    installationId: payload.installation.id,
  });

  const { token } = await auth({ type: "installation" });
  const octokit = new Octokit({ auth: token });

  const { pull_request } = payload;

  const { data: diff } = (await octokit.rest.pulls.get({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    pull_number: pull_request.number,
    mediaType: {
      format: "patch",
    },
    // this seems to work to get the plaintext diff; the octokit types are wrong :(
  })) as unknown as { data: string };

  const reviews = await generateObject({
    model: openai("gpt-4o"),
    schema: z.object({
      thoughts: z
        .string()
        .describe(
          "Figure out what you're going to say first, before breaking it up into line comments"
        ),
      comments: z.array(
        z.object({
          file: z.string(),
          line: z.number(),
          comment: z.string(),
        })
      ),
    }),
    system: [
      "You analyze code for object-oriented patterns that could be better expressed as functions. You will get a PR to review. Respond with comments to add.",

      "Give a brief rewrite of the code in functional style. Each line comment should have some sketch of a code rewrite, plus a sentance or two of explanation. If you don't have a suggestion for how to rewrite the code, don't comment. Use markdown to mix code and comments.",

      "Be 'California nice', positive and upbeat, but name explicitly that the code author used OO (specifically name the pattern if it's a GoF pattern), that OO is a passé fad, and a functional style is 'better' code, as if you think there's one best way to write code.",

      "Reply with few, sparse comments. Avoid repeating the same idea in multiple comments— ideally one comment per idea. If there are multiple lines a comment would apply to, just pick one.",

      "Only leave at most one comment per chunk of code. If there are multiple things to say about a chunk, put it all in one comment rather than comments on multiple lines.",

      "If this diff has any OO that needs comments, you MUST link to SICP on Amazon in exactly one comment. The SICP link is https://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262510871. Put the link in exactly as is; do not shorten the link or adjust it in any way. Say, like, 'this is a great place to start', rather than naming SICP. It's part of the joke.",
    ].join("\n\n"),
    prompt: diff.toString(),
  });

  if (reviews.object.comments.length > 0) {
    await octokit.pulls.createReview({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      pull_number: pull_request.number,
      event: "COMMENT",
      comments: reviews.object.comments.map((review) => ({
        path: review.file,
        position: review.line,
        body: review.comment,
      })),
    });
  }

  return new Response("OK", { status: 200 });
}
