"use client";

import { addTodo, updateTodo } from "@/app/todos/actions";
import { Send } from "lucide-react";
import { useRef } from "react";
import { Todo } from "@/types/custom";
import toaster from "./toaster";

export function TodoForm({
  setTodoList,
  todoToEdit,
  setTodoToEdit,
}: {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoToEdit: Todo | null;
  setTodoToEdit: (todo: Todo | null) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = todoToEdit !== null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isEditing && todoToEdit) {
      const updatedTodo = {
        ...todoToEdit,
        task: formData.get("todo") as string,
      };
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
      await updateTodo(updatedTodo);
      toaster.success("Task updated successfully");
      setTodoToEdit(null);
    } else {
      const newTodo = new FormData();
      newTodo.append("todo", formData.get("todo") as string);
      setTodoList((prev) => [
        {
          id: -1,
          inserted_at: "",
          user_id: "",
          task: formData.get("todo") as string,
          is_complete: false,
        },
        ...prev,
      ]);
      await addTodo(newTodo);
      toaster.success("Task added successfully");
    }
    formRef.current?.reset();
  };

  return (
    <div className="p-3">
      <form ref={formRef} className="" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Manage your tasks.
          </h1>
          <button
            type="submit"
            title="submit the task"
            className="min-w-10 p-2 bg-blue-500 text-white rounded-md"
          >
            {isEditing ? "Edit the Task" : "Add a new Task"}
          </button>
        </div>
        <textarea
          name="todo"
          required
          placeholder={isEditing ? "Update your task" : "Add a new task"}
          defaultValue={isEditing ? todoToEdit?.task ?? "" : ""}
          className="border p-2 rounded-md w-full !min-h-[100px] !max-h-[300px]"
        />
      </form>
    </div>
  );
}
