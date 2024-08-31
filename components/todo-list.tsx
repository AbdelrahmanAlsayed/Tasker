"use client";

import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Todo } from "@/types/custom";
import { useState, useEffect } from "react";

export function TodoList({ todos }: { todos: Array<Todo> }) {
  const [todoList, setTodoList] = useState<Array<Todo>>(todos);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return (
    <>
      <TodoForm
        setTodoList={setTodoList}
        todoToEdit={todoToEdit}
        setTodoToEdit={setTodoToEdit}
      />
      <div className="w-full flex flex-col gap-4">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodoList={setTodoList}
            setTodoToEdit={setTodoToEdit}
          />
        ))}
      </div>
    </>
  );
}
