import { z } from "zod";

export const createInput = z.object({
  text: z.string().max(200, "最大200文字までです"),
});

export const createUpdate = z.object({
  id: z.string(),
  text: z.string().max(200, "最大200文字までです"),
});
