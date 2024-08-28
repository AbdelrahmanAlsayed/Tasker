import { TodoList } from "@/components/todo-list";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const supabase = await createSupabaseServerClient();

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
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Todo s
      </h1>
      <TodoList todos={todos ?? []} />
    </section>
  );
}
