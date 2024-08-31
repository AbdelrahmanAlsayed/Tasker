"use client";

import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Todo } from "@/types/custom";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import toaster from "./toaster";

export function TodoItem({
  todo,
  setTodoList,
  setTodoToEdit,
}: {
  todo: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodoToEdit: (todo: Todo) => void;
}) {
  const [checked, setChecked] = useState<boolean>(todo.is_complete ?? false);

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked;
    setChecked(val);
    await updateTodo({ ...todo, is_complete: val });
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      setTodoList((prev) => prev.filter((t) => t.id !== todo.id));
      toaster.success("Task deleted successfully");
    } catch (error) {
      toaster.error("An error occurred while deleting the task");
    }
  };

  return (
    <div
      className={`w-full bg-white p-4 rounded-md shadow-md ${
        checked ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-start gap-3 p-3">
        <span className="h-10 w-10 flex items-center justify-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheck}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </span>
        <p className="flex-1 pt-2 min-w-0 break-words">{todo.task}</p>
        <button
          onClick={() => setTodoToEdit(todo)}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          <Pencil className="h-5 w-5" />
          <span className="sr-only">Edit Todo</span>
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </button>
      </div>
    </div>
  );
}
