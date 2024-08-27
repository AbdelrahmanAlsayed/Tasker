"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { CreateUserInput, LoginUserInput } from "@/lib/user-schema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword({
  data,
  emailRedirectTo,
}: {
  data: CreateUserInput;
  emailRedirectTo?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo,
    },
  });
  return JSON.stringify(result);
}

export async function signInWithEmailAndPassword(data: LoginUserInput) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
