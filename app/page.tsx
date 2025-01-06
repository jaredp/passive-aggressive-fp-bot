/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import screenshot from "./screenshot.png";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const install_badge = (
  <a href="https://github.com/apps/passive-aggressive-fp-bot">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://img.shields.io/badge/Install-GitHub_App-2ea44f?logo=github"
      alt="Install GitHub App"
      height={16}
    />
  </a>
);

export default function Home() {
  return (
    <div className="py-20 font-[family-name:var(--font-geist-sans)]">
      <main className="space-y-8 max-w-3xl px-6 sm:px-16 mx-auto">
        <h1 className="text-4xl font-bold">
          AI coding assistants can promote libraries and frameworks.
        </h1>
        <p className="text-lg text-gray-500">
          One of the biggest problems with coding is knowing which libraries and
          frameworks to use. On the other side, if you come up with a really
          good abstraction, just publishing to npm isn't going to get it to
          people making apps that would benefit form it.
        </p>
        <p className="text-lg text-gray-500">
          Some styles are more productive than others.
        </p>

        <p className="text-lg text-gray-500">
          On the other hand, we really don't want our AI assistants to serve
          ads.
        </p>

        <p className="text-lg text-gray-500">
          Here's an example. This is a real Github bot that is installable. It
          recommends SICP if someone tries to commit Java-style code to your
          repo.
        </p>

        <div>
          <div className="mb-2 flex flex-row justify-end">{install_badge}</div>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-600">
            <div className="text-gray-800 mb-4 dark:text-gray-200">
              <span className="font-bold">@passive-aggressive-fp-bot</span>
              <span className="text-gray-500 ml-2">13 minutes ago</span>
            </div>
            <div className="space-y-4">
              <p>
                The Adder class is a classic example of the Command pattern,
                which is a bit overkill for a simple addition operation. Instead
                of creating an Adder class, consider using a simple function
                like{" "}
                <code className="bg-gray-200 p-1 rounded font-mono dark:bg-gray-700">{`const add = (n) => (x) => x + n;`}</code>
                . This approach is more concise and leverages the power of
                closures in JavaScript. For more on functional programming, this
                is a great place to start:{" "}
                <a
                  href="https://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262510871"
                  className="text-blue-600 hover:underline"
                >
                  https://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262510871
                </a>
                .
              </p>

              <Zoom>
                <Image
                  src={screenshot}
                  alt="Screenshot of the PR review bot in action"
                  width={800}
                  height={450}
                />
              </Zoom>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-amber-800">
            <p>
              Please don't actually use this at work. It's rude. This is a joke
              conversation starter, not a way to speak to your colleagues.
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-500">Is this good? Is this bad?</p>

        <p className="text-lg text-gray-500">
          It's the future, so we should figure out what we want from it!
        </p>

        <p className="text-lg text-gray-500">
          Code at{" "}
          <a
            href="https://github.com/jaredp/passive-aggressive-fp-bot"
            className="text-blue-600 hover:underline"
          >
            https://github.com/jaredp/passive-aggressive-fp-bot
          </a>
          . Pull requests welcome iff funny.
        </p>
      </main>
    </div>
  );
}
