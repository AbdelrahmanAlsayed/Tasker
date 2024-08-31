import { TodoList } from "@/components/todo-list";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RealTimeTodos from "./real-time-todos";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false });

  return (
    <section className="p-3 pt-6 w-full flex flex-col gap-4  container mx-auto">
      <RealTimeTodos serverTodos={todos ?? []} />
    </section>
  );
}
