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

  const userData = {
    Name: user.user_metadata.full_name,
    Email: user.email,
    Username: user.user_metadata.user_name,
    Provider: user.app_metadata.provider,
    "Last Sign-In": formatDate(user.last_sign_in_at),
    "Created At": formatDate(user.created_at),
    "Confirmed At": formatDate(user.confirmed_at),
    "Email Confirmed At": formatDate(user.email_confirmed_at),
  };

  return (
    <section className="flex justify-center items-center h-[calc(100vh-180px)]">
      <div className="border shadow-md p-10  rounded-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Profile Page
        </h1>
        <div className="flex flex-col space-y-6">
          {Object.entries(userData).map(([label, value]) =>
            value ? (
              <p key={label}>
                <strong>{label}:</strong> {value}
              </p>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
}
