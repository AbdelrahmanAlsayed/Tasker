import HomePageButtons from "@/components/HomePageButtons";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="p-20 flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">Tasker</h1>
      <p className="text-lg text-center mb-6 text-gray-700 max-w-md">
        Tasker helps you efficiently organize, prioritize, and manage your daily
        tasks. Stay on top of your responsibilities and boost your productivity
        with an intuitive and user-friendly interface.
      </p>
      <HomePageButtons isAuthenticated={!!user} />
    </section>
  );
}
