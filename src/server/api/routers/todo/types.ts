import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "../../root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type allTodosOutput = RouterOutputs["todo"]["all"];

export type TodoType = allTodosOutput;

export const todoInput = z
  .string({
    required_error: "Describe your todo",
  })
  .min(1, "Todo must be at least 1 character long")
  .max(50);
