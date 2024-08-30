"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
    return redirect("/login?message=No provider selected");
  }
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `https://taskerappp.vercel.app/auth/callback`,
      // redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (error) {
    redirect("/login");
  }

  return redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
