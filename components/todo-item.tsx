"use client";
import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Todo } from "@/types/custom";
import { Trash2, Pencil } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { TodoOptimisticUpdate } from "./todo-list";

export function TodoItem({
  todo,
  optimisticUpdate,
  setTodoToEdit
}: {
  todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
  setTodoToEdit: (todo: Todo) => void;
}) {
  const { pending } = useFormStatus();
  const [checked, setChecked] = useState(todo.is_complete);

  return (
    <div
      className={`w-full ${
        pending
          ? "opacity-50 bg-gray-100 p-4 rounded-md shadow-md"
          : "bg-white p-4 rounded-md shadow-md"
      }`}
    >
      <div className="flex items-start gap-3 p-3">
        <span className="h-10 w-10 flex items-center justify-center">
          <input
            type="checkbox"
            disabled={pending}
            checked={Boolean(checked)}
            onChange={async (e) => {
              const val = e.target.checked;
              setChecked(val);
              await updateTodo({ ...todo, is_complete: val });
            }}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </span>
        <p className="flex-1 pt-2 min-w-0 break-words">{todo.task}</p>
        <button
          disabled={pending}
          onClick={async (e) => {
            e.preventDefault();
            optimisticUpdate({ action: "delete", todo });
            await deleteTodo(todo.id);
          }}
          className="p-2 text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </button>
        <button
          disabled={pending}
          onClick={() => setTodoToEdit(todo)}
          className="p-2 text-blue-600 hover:text-blue-800"
        >
          <Pencil className="h-5 w-5" />
          <span className="sr-only">Edit Todo</span>
        </button>
      </div>
    </div>
  );
}
