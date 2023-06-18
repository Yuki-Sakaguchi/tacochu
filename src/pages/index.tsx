import Head from "next/head";
import { api } from "@/utils/api";
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";

function ShowExample() {
  const example = api.example.getAll.useQuery();

  if (!example.data) return <p>Loading ...</p>;

  const displayExample = example.data.sort((a, b) =>
    a.updatedAt > b.updatedAt ? -1 : 1
  );

  return (
    <div>
      <ul>
        {displayExample.map((example) => (
          <li className="mt-2" key={example.id}>
            <UpdateExample id={example.id} text={example.text} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * データを追加するコンポーネント
 */
function AddExample() {
  const mutation = api.example.create.useMutation();
  const utils = api.useContext();

  const [text, setText] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(
      { text },
      {
        onSuccess() {
          utils.example.getAll.invalidate();
          setText("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          className="border"
          type="text"
          value={text}
          onChange={handleChange}
        />
        <button
          className=" bg-blue-600 px-2 text-white"
          disabled={mutation.isLoading}
        >
          追加
        </button>
        {mutation.error && <p>{mutation.error.message}</p>}
      </div>
    </form>
  );
}

/**
 * データを更新するコンポーネント
 */
function UpdateExample({ id, text }: { id: string; text: string }) {
  const updateMutation = api.example.udpate.useMutation();
  const deleteMutation = api.example.delete.useMutation();
  const utils = api.useContext();

  const [updateText, setUpdateText] = useState(text);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdateText(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate(
      { id, text: updateText },
      {
        onSuccess() {
          utils.example.getAll.invalidate();
        },
      }
    );
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    deleteMutation.mutate(
      { id },
      {
        onSuccess() {
          utils.example.getAll.invalidate();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          className="border"
          type="text"
          value={updateText}
          onChange={handleChange}
        />
        <button
          className=" bg-blue-600 px-2 text-white"
          disabled={updateMutation.isLoading}
        >
          更新
        </button>
        <button
          className=" bg-blue-600 px-2 text-white"
          type="button"
          onClick={handleClick}
          disabled={deleteMutation.isLoading}
        >
          削除
        </button>
        {updateMutation.error && <p>{updateMutation.error.message}</p>}
      </div>
    </form>
  );
}

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <ShowExample />
        <div className="mt-6">
          <AddExample />
        </div>
      </main>
    </>
  );
}
