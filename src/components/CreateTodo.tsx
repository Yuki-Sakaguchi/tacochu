import { useState } from "react";
import toast from "react-hot-toast";
import { createInput } from "@/server/types/todo";
import type { Todo } from "@/server/types/todo";
import { api } from "@/utils/api";

export function CreateTodo() {
  const [newTodo, setNewTodo] = useState("");

  const trpc = api.useContext();
  const { mutate } = api.todo.create.useMutation({
    // mutation を実行する前に動く処理
    onMutate: async (newTodo) => {
      await trpc.todo.all.cancel(); // キャッシュが上書きされない様にキャンセル
      const previousTodos = trpc.todo.all.getData(); // キャッシュから更新前のデータのスナップショットを取得
      // キャッシュを更新、新しいTodoデータを仮で追加
      trpc.todo.all.setData(undefined, (prev) => {
        const optimisticTodo: Todo = {
          id: "optimistic-todo-id",
          text: newTodo,
          isCompleted: false,
        };
        if (!prev) return [optimisticTodo];
        return [optimisticTodo, ...prev];
      });
      setNewTodo("");
      return { previousTodos }; // スナップショットを返す
    },
    // エラー時には元に戻す
    onError: (err, newTodo, context) => {
      toast.error("Todoの作成時にエラーが発生しました");
      console.error(err);
      setNewTodo(newTodo);
      if (!context) return;
      trpc.todo.all.setData(undefined, () => context.previousTodos); // Todo一覧を取得する関数のキャッシュデータをpreviousTodosに変更する
    },
    // mutation完了後に成功、失敗問わず動く。データを再取得
    onSettled: async () => {
      await trpc.todo.all.invalidate(); // キャッシュ関係なく再取得
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const result = createInput.safeParse(newTodo);
        if (!result.success) {
          toast.error(result.error.format()._errors.join("\n"));
          return;
        }
        mutate(newTodo);
      }}
      className="flex justify-between gap-3"
    >
      <input
        className="text-gray-four w-full appearance-none rounded border px-3 py-2 leading-tight"
        type="text"
        placeholder="New Todo..."
        name="new-todo"
        id="new-todo"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button className="border-cream-four bg-green-one text-gray-five outline-green-one hover:text-green-five focus-visible:text-green-five focus-visible:outline-green-five group flex items-center rounded-md px-6 py-3 text-lg font-semibold outline outline-2 outline-offset-2">
        Create
        <svg
          className="text-gray-five group-hover:text-green-five group-focus-visible:text-green-five ml-3 h-4 w-4"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_35_391)">
            <path
              d="M14.4 14.4V8H17.6V14.4H24V17.6H17.6V24H14.4V17.6H8V14.4H14.4ZM16 32C7.1632 32 0 24.8368 0 16C0 7.1632 7.1632 0 16 0C24.8368 0 32 7.1632 32 16C32 24.8368 24.8368 32 16 32ZM16 28.8C19.3948 28.8 22.6505 27.4514 25.051 25.051C27.4514 22.6505 28.8 19.3948 28.8 16C28.8 12.6052 27.4514 9.3495 25.051 6.94903C22.6505 4.54857 19.3948 3.2 16 3.2C12.6052 3.2 9.3495 4.54857 6.94903 6.94903C4.54857 9.3495 3.2 12.6052 3.2 16C3.2 19.3948 4.54857 22.6505 6.94903 25.051C9.3495 27.4514 12.6052 28.8 16 28.8V28.8Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_35_391">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </form>
  );
}
