"use client";

import { api } from "@/trpc/react";
import Todo from "../Todo";
import Loading from "@/components/Loading";
import CreateTodo from "../CreateTodo";

export default function Todos() {
  const { data: todos, isFetching } = api.todo.all.useQuery();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      {!Array.isArray(todos) || todos.length === 0 ? (
        <div className="text-center text-gray-500">
          Create your first todo ...
        </div>
      ) : (
        todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} done={todo.done} text={todo.text} />
        ))
      )}
      <CreateTodo />
    </div>
  );
}
