"use client";
import { addTodo, updateTodo } from "@/app/todos/actions";
import { Send, Pencil } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { Todo } from "@/types/custom";
import toaster from "./toaster";

function FormContent({
  isEditing,
  currentTodo,
}: {
  isEditing: boolean;
  currentTodo: Todo | null;
}) {
  const { pending } = useFormStatus();
  return (
    <>
      <textarea
        disabled={pending}
        minLength={4}
        name="todo"
        required
        placeholder={isEditing ? "Update your task" : "Add a new task"}
        defaultValue={isEditing ? currentTodo?.task ?? "" : ""}
        className="border p-2 rounded-md w-full"
      />
      <button
        type="submit"
        className="min-w-10 p-2 bg-blue-500 text-white rounded-md"
        disabled={pending}
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">
          {isEditing ? "Update Todo" : "Submit Todo"}
        </span>
      </button>
    </>
  );
}

export function TodoForm({
  optimisticUpdate,
  todoToEdit,
  setTodoToEdit,
}: {
  optimisticUpdate: TodoOptimisticUpdate;
  todoToEdit: Todo | null;
  setTodoToEdit: (todo: Todo | null) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = todoToEdit !== null;

  return (
    <div className="bg-white rounded-md shadow-md">
      <div className="p-3">
        <form
          ref={formRef}
          className="flex gap-4"
          action={async (data) => {
            if (isEditing && todoToEdit) {
              const updatedTodo = {
                ...todoToEdit,
                task: data.get("todo") as string,
              };
              optimisticUpdate({ action: "update", todo: updatedTodo });
              await updateTodo(updatedTodo);
              toaster.success("Task updated successfully");

              setTodoToEdit(null);
            } else {
              const newTodo: Todo = {
                id: -1,
                inserted_at: "",
                user_id: "",
                task: data.get("todo") as string,
                is_complete: false,
              };
              optimisticUpdate({ action: "create", todo: newTodo });
              await addTodo(data);
              toaster.success("Task added  successfully");
            }
            formRef.current?.reset();
          }}
        >
          <FormContent isEditing={isEditing} currentTodo={todoToEdit} />
        </form>
      </div>
    </div>
  );
}
