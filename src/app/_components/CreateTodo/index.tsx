import { todoInput } from "@/server/api/routers/todo/types";
import { api } from "@/trpc/react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const CreateTodo = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const utils = api.useUtils();
  const { mutate } = api.todo.create.useMutation({
    onSettled: async () => {
      await utils.todo.invalidate();
      setNewTodo("");
      setError(null);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div className="py-6">
      <form
        className="mb-4 flex"
        onSubmit={(e) => {
          e.preventDefault();
          const result = todoInput.safeParse(newTodo);
          if (!result.success) {
            setError(result.error.errors.map((err) => err.message).join(", "));
            return;
          }
          mutate({ text: newTodo });
        }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          name="new-todo"
          id="new-todo"
          placeholder="Add a new todo..."
          className="flex-grow rounded-l-lg bg-white px-4 py-2 text-purple-900 focus:outline-none"
        />
        <button className="rounded-r-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none">
          <PlusCircle size={24} />
        </button>
      </form>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default CreateTodo;
