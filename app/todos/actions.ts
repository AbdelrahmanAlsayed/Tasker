"use server";

import { Todo } from "@/types/custom";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function addTodo(formData: FormData) {
  const supabase = await createClient();
  const text = formData.get("todo") as string | null;

  if (!text) {
    throw new Error("Text is required");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").insert({
    task: text,
    user_id: user.id,
  });

  if (error) {
    throw new Error("Error adding task");
  }

  revalidatePath("/todos");
}

export async function deleteTodo(id: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").delete().match({
    // user_id: user.id,
    id: id,
  });

  if (error) {
    throw new Error("Error deleting task");
  }

  revalidatePath("/todos");
}

export async function updateTodo(todo: Todo) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase.from("todos").update(todo).match({
    // user_id: user.id,
    id: todo.id,
  });

  if (error) {
    throw new Error("Error updating task");
  }

  revalidatePath("/todos");
}
