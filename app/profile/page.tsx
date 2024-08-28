"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <section className="min-h-screen p-20 flex justify-center items-center">
      <div>
        <div>
          <p className="mb-3 text-5xl text-center font-semibold">
            Profile Page
          </p>
          <div className="mt-8">
            <p className="mb-3">Id: {user.id}</p>
            <p className="mb-3">Audience: {user.aud}</p>
            <p className="mb-3">Role: {user.role}</p>
            <p className="mb-3">Email: {user.email}</p>
            <p className="mb-3">Provider: {user.app_metadata.provider}</p>
            <p className="mb-3">Created At: {user.created_at}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
