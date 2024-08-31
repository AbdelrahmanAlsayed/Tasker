"use client";

import React, { useEffect, useState } from "react";
import { TodoList } from "@/components/todo-list";
import { createClient } from "@/utils/supabase/client";

interface Todo {
  id: number;
  inserted_at: string;
  is_complete: boolean | null;
  task: string | null;
  user_id: string;
}

interface RealTimeTodosProps {
  serverTodos: Todo[];
}

const RealTimeTodos: React.FC<RealTimeTodosProps> = ({ serverTodos }) => {
  const [todos, setTodos] = useState<Todo[]>(serverTodos);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("real-time-todos")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          const newTodo = payload.new as Todo;
          setTodos((prevTodos) => [newTodo, ...prevTodos]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          const updatedTodo = payload.new as Todo;
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            )
          );
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          const deletedTodoId = payload.old.id as number;
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== deletedTodoId)
          );
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, todos, setTodos]);

  return <TodoList todos={todos} />;
};

export default RealTimeTodos;
