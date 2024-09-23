"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Save, X } from "lucide-react";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { cx } from "@/lib/utils";
import type { Todo } from "@prisma/client";

type TodoProps = {
  id: Todo["id"];
  text: Todo["text"];
  done: Todo["done"];
};

export function Todo({ id, text, done }: TodoProps) {
  const [editText, setEditText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const utils = api.useUtils();

  const updateMutation = api.todo.update.useMutation({
    onSuccess: () => utils.todo.all.invalidate(),
  });

  const deleteMutation = api.todo.delete.useMutation({
    onSuccess: () => utils.todo.all.invalidate(),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateMutation.mutate(
      {
        id,
        done,
        text: editText,
      },
      {
        onSuccess: () => {
          setEditText(text);
          setIsEditing(false);
        },
      },
    );
  }

  return (
    <div className="mb-2 flex items-center justify-between rounded-lg bg-white p-4 shadow">
      <div className="flex flex-grow items-center">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex w-full items-center">
            <input
              type="text"
              autoFocus
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="ml-3 w-full overflow-x-auto border-b-2 border-purple-600 text-lg text-purple-900 focus:outline-none"
            />
            <button
              type="submit"
              className={cx(
                "mr-2 text-green-500 hover:text-green-700 focus:outline-none",
                editText === text && "hidden",
              )}
              disabled={editText.length === 0 || editText === text}
            >
              <Save size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </form>
        ) : (
          <label className="flex w-full cursor-pointer items-center">
            <input
              type="checkbox"
              checked={done}
              onChange={() => updateMutation.mutate({ id, text, done: !done })}
              className="form-checkbox h-5 w-5 cursor-pointer rounded text-purple-600 focus:ring-purple-500"
            />
            <span
              className={cx(
                "ml-3 text-lg",
                done ? "text-gray-500 line-through" : "text-purple-900",
                "break-words",
              )}
            >
              {text}
            </span>
          </label>
        )}
      </div>

      {!isEditing && (
        <div className="ml-2 flex items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="mr-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => deleteMutation.mutate(id)}
            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
