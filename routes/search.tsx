/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = NAMES.filter((name) =>
      name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;

  return (
    <div class={tw`max-w-7xl mx-auto p-6`}>
      <form>
        <label>
          <span class={tw`font-semibold block`}>Query</span>
          <input
            type="text"
            name="q"
            value={query}
            class={tw`border border-gray-300 rounded px-3 py-1 mt-1`}
          />
        </label>
        <button
          class={tw`block w-20 bg-blue-500 text-white px-2 py-1 rounded mt-2`}
          type="submit"
        >
          Search
        </button>
      </form>
      <ul class={tw`mt-6`}>
        {results.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
