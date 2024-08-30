import { signOut } from "@/app/_actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProfileLink from "./ProfileLink";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Tasker</span>
          </a>
          <Link href="/todos">Todos</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <>
              <form className="flex items-center gap-2">
                <p>{user.email}</p>
                <button
                  type="submit"
                  formAction={signOut}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Out
                </button>
              </form>
              <ProfileLink />
            </>
          ) : (
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <Link href="/login">Sign In</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
