"use client";
import { addTodo } from "@/app/todos/actions";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { Todo } from "@/types/custom";

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <textarea
        disabled={pending}
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
        className="border p-2 rounded-md w-full"
      />
      <button
        type="submit"
        size="icon"
        className="min-w-10 p-2 bg-blue-500 text-white rounded-md"
        disabled={pending}
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </button>
    </>
  );
}

export function TodoForm({
  optimisticUpdate,
}: {
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="bg-white rounded-md shadow-md">
      <div className="p-3">
        <form
          ref={formRef}
          className="flex gap-4"
          action={async (data) => {
            const newTodo: Todo = {
              id: -1,
              inserted_at: "",
              user_id: "",
              task: data.get("todo") as string,
              is_complete: false,
            };
            optimisticUpdate({ action: "create", todo: newTodo });
            await addTodo(data);
            formRef.current?.reset();
          }}
        >
          <FormContent />
        </form>
      </div>
    </div>
  );
}
