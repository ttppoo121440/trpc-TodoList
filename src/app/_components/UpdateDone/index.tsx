import { api } from "@/trpc/react";
import React from "react";
import { type UpdateDoneProps } from "./types";

const UpdateDone = ({ done, id }: UpdateDoneProps) => {
  const utils = api.useUtils();
  const { mutate: doneMutation } = api.todo.toggle.useMutation({
    onMutate: async (updatedTodo) => {
      const previousTodos = utils.todo.all.getData() ?? [];

      utils.todo.all.setData(undefined, (old) =>
        old?.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, done: updatedTodo.done }
            : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (error, variables, context) => {
      if (context?.previousTodos) {
        utils.todo.all.setData(undefined, context.previousTodos);
      }
    },
    onSuccess: async () => {
      await utils.todo.invalidate();
    },
  });
  return (
    <input
      type="checkbox"
      checked={done}
      onChange={(e) => doneMutation({ id, done: e.target.checked })}
      className="form-checkbox h-5 w-5 cursor-pointer rounded text-purple-600 focus:ring-purple-500"
    />
  );
};

export default UpdateDone;
