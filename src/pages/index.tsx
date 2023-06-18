import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";

function ShowExample() {
  const example = api.example.getAll.useQuery();
  if (!example.data) return <p>Loading ...</p>;
  return (
    <div>
      <ul>
        {example.data.map((example) => (
          <li key={example.id}>{example.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <ShowExample />
      </main>
    </>
  );
}
