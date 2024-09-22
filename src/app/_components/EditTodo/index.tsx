import { useState, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import { Save, X } from "lucide-react";
import { type EditTodoProps } from "./types";

export default function EditTodo({ id, text, onCancel }: EditTodoProps) {
  const [newText, setNewText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const utils = api.useUtils();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { mutate: updateMutation } = api.todo.update.useMutation({
    onSettled: async () => {
      await utils.todo.invalidate();
      onCancel();
    },
  });

  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation({ id, text: newText });
  };

  return (
    <form onSubmit={handleSaveClick} className="flex w-full items-center">
      <input
        type="text"
        ref={inputRef}
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        className="ml-3 w-full overflow-x-auto border-b-2 border-purple-600 text-lg text-purple-900 focus:outline-none"
      />
      <button
        type="submit"
        className={`mr-2 text-green-500 hover:text-green-700 focus:outline-none ${newText === text ? "hidden" : ""}`}
        disabled={!newText || newText === text}
      >
        <Save size={20} />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X size={20} />
      </button>
    </form>
  );
}
