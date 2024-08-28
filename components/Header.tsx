import Link from "next/link";
import createSupabaseServerClient from "@/lib/supabase/server";
import { signOut } from "@/app/_actions";

const Header = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-200 bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 md:px-8">
        <div>
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            Tasker
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              <li>
                <Link
                  href="/todos"
                  className="text-ct-dark-600 hover:underline text-[17px]"
                >
                  Todos
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-ct-dark-600 hover:underline"
                >
                  Profile
                </Link>
              </li>

              <li>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="text-ct-dark-600 hover:text-red-600"
                  >
                    Logout
                  </button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/register"
                  className="text-ct-dark-600 hover:underline"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-ct-dark-600 hover:underline"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
