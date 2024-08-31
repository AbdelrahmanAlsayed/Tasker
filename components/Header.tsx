"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import ProfileIcon from "./ProfileIcon";
import Logo from "./Logo";
import CustomButton from "./CustomButton";
import { BeatLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// I'm checking for the user exist or not on on every change for the url

const fetchUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export default function Header() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    refetchInterval: false,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }, [pathname, queryClient]);

  if (isLoading) return <BeatLoader color="#000000" size={20} />;
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl justify-between items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Logo />
        </nav>
        <div className="">
          {user ? (
            <ProfileIcon />
          ) : (
            <CustomButton href="/login" text="Sign in" />
          )}
        </div>
      </div>
    </header>
  );
}
