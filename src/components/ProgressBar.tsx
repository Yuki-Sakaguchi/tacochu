import type { Todo } from "@/server/types/todo";

export function ProgressBar({ todos }: { todos: Todo[] }) {
  const totalCount = todos.length;
  const completeCount = todos.filter((todo) => todo.isCompleted).length;
  const progressCount = todos.filter((todo) => !todo.isCompleted).length;
  const completePercentage =
    Math.round((completeCount / totalCount) * 100) || 0;
  const progressPercentage =
    Math.round((progressCount / totalCount) * 100) || 0;

  return (
    <section className="mt-10">
      <h3 className="text-gray-three text-xl font-bold">Progress</h3>
      <div className="mt-8 space-y-8">
        <div>
          <div className="text-gray-three flex justify-between text-base font-normal">
            <p>In Progress</p>
            <p>{progressPercentage}%</p>
          </div>
          <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-300">
            <div
              className="h-4 rounded-full bg-green-300 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="text-gray-three flex justify-between text-base font-normal">
            <p>Completed</p>
            <p>{completePercentage}%</p>
          </div>
          <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-gray-300">
            <div
              className="h-4 rounded-full bg-blue-300 transition-all duration-500 ease-out"
              style={{ width: `${completePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
