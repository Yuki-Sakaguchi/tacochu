import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>; // AppRouter の出力の型を推論するためのヘルパータイプ
type allTodosOutput = RouterOutput["todo"]["all"]; // Todo を全件取得するルーターの出力の型
export type Todo = allTodosOutput[number]; // Todoの型

export const createInput = z.string().min(1).max(50);

export const updateInput = z.object({
  id: z.string(),
  text: z.string().min(1).max(50),
});

export const toggleInput = z.object({
  id: z.string(),
  is_completed: z.boolean(),
});
