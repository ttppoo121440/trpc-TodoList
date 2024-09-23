import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassArray } from "clsx";

export function cx(...inputs: ClassArray): string {
  return twMerge(clsx(inputs));
}
