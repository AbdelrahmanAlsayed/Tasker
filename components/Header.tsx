import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/_actions";

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white h-20">
      <nav className="h-full flex justify-between container items-center">
        <div>
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            Tasker
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          {user ? (
            <>
              <li>
                <Link href="/profile" className="text-ct-dark-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/todos" className="text-ct-dark-600">
                  Todos
                </Link>
              </li>
              <li>
                <form action={signOut}>
                  <button className="ml-4 text-ct-dark-600">Logout</button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-ct-dark-600">
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
