import { z } from "zod";

export const createInput = z.string().min(1).max(50);

export const updateInput = z.object({
  id: z.string(),
  text: z.string().min(1).max(50),
});

export const toggleInput = z.object({
  id: z.string(),
  is_completed: z.boolean(),
});
