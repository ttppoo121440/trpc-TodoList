import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import React from "react";
import { type DeleteTodoProps } from "./types";

const DeleteTodo = ({ id }: DeleteTodoProps) => {
  const utils = api.useUtils();
  const { mutate: deleteMutation } = api.todo.delete.useMutation({
    onSettled: async () => {
      await utils.todo.invalidate();
    },
  });
  return (
    <button
      onClick={() => deleteMutation(id)}
      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
    >
      <Trash2 size={20} />
    </button>
  );
};

export default DeleteTodo;
