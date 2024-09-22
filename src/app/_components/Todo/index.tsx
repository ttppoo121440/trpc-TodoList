import { useState } from "react";
import { Edit } from "lucide-react";
import DeleteTodo from "../DeleteTodo";
import UpdateDone from "../UpdateDone";
import EditTodo from "../EditTodo";
import { type TodoProps } from "./types";

export default function Todo({ id, text, done }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="mb-2 flex items-center justify-between rounded-lg bg-white p-4 shadow">
      <div className="flex flex-grow items-center">
        {isEditing ? (
          <EditTodo id={id} text={text} onCancel={handleCancelEdit} />
        ) : (
          <label className="flex w-full cursor-pointer items-center">
            <UpdateDone done={done} id={id} />
            <span
              className={`ml-3 text-lg ${done ? "text-gray-500 line-through" : "text-purple-900"} break-words`}
            >
              {text}
            </span>
          </label>
        )}
      </div>
      {!isEditing && (
        <div className="ml-2 flex items-center">
          <button
            onClick={handleEditClick}
            className="mr-2 text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <Edit size={20} />
          </button>
          <DeleteTodo id={id} />
        </div>
      )}
    </div>
  );
}
