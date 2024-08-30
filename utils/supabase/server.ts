import { Database } from "@/types/supabase";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Get cookie value by name
          const cookie = cookieStore.get(name);
          return cookie ? cookie.value : undefined;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Set cookie with name, value, and options
          try {
            cookieStore.set({
              name,
              value,
              ...options,
            });
          } catch (error) {
            // Handle errors when setting cookies
            console.error(`Failed to set cookie: ${name}`, error);
          }
        },
        remove(name: string, options: CookieOptions) {
          // Remove cookie by setting it to an empty value
          try {
            cookieStore.set({
              name,
              value: "",
              ...options,
            });
          } catch (error) {
            // Handle errors when removing cookies
            console.error(`Failed to remove cookie: ${name}`, error);
          }
        },
      },
    }
  );
}
