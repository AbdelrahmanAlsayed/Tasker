"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const formatDate = (dateString?: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
  };

  return (
    <section className="p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Profile Page
        </h1>
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold">
            {user.user_metadata.full_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.user_metadata.user_name}
          </p>
          <p>
            <strong>Provider:</strong> {user.app_metadata.provider}
          </p>
          <p>
            <strong>Last Sign-In:</strong> {formatDate(user.last_sign_in_at)}
          </p>
          <p>
            <strong>Created At:</strong> {formatDate(user.created_at)}
          </p>
          <p>
            <strong>Confirmed At:</strong> {formatDate(user.confirmed_at)}
          </p>
          <p>
            <strong>Email Confirmed At:</strong>{" "}
            {formatDate(user.email_confirmed_at)}
          </p>
        </div>
      </div>
    </section>
  );
}
