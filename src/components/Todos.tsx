import { api } from "@/utils/api";
import { Todo } from "@/components/Todo";

export function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="mt-32 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-transparent">
          <p className="ml-4 mt-32 text-xl">loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="ml-4 mt-10 text-xl">Error fetching todos</p>
      </div>
    );
  }

  return (
    <>
      {todos.map((todo) => (
        <section key={todo.id} className="mt-8 space-y-4">
          <Todo todo={todo} />
        </section>
      ))}
    </>
  );
}
