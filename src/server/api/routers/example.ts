import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createInput } from "@/server/types/example";
import { prisma } from "@/server/db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  create: publicProcedure.input(createInput).mutation(async ({ input }) => {
    const example = await prisma.example.create({
      data: {
        text: input.text,
      },
    });
    return example;
  }),
});
