"use client";

import { Todo } from "@/app/_components/Todo";
import { api } from "@/trpc/react";
import { useEffect, useRef, useState } from "react";
import { PlusCircle } from "lucide-react";
import Loading from "@/components/Loading";

export function TodoList() {
  const { data: todolist = [], isFetching } = api.todo.all.useQuery();
  const [newTodo, setNewTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = api.useUtils();

  const createMutation = api.todo.create.useMutation({
    onSuccess: () => {
      void utils.todo.all.invalidate();
      setNewTodo("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createMutation.mutate({ text: newTodo });
  }

  useEffect(() => {
    if (!isFetching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFetching]);

  if (isFetching) {
    return <Loading />;
  }
  return (
    <div>
      {todolist.length === 0 ? (
        <div className="text-center text-gray-500">
          Create your first todo ...
        </div>
      ) : (
        todolist.map((todo) => <Todo key={todo.id} {...todo} />)
      )}

      <div className="py-6">
        <form className="mb-4 flex" onSubmit={handleCreateSubmit}>
          <input
            type="text"
            ref={inputRef}
            required
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
      </div>
    </div>
  );
}
