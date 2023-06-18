import { z } from "zod";

export const createInput = z.object({
  text: z.string().max(200, "最大200文字までです"),
});
