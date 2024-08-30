"use client";

import { Github } from "lucide-react";
import { oAuthSignIn } from "../_actions";

export default function GitHubAuth() {
  return (
    <button
      className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-100"
      onClick={async () => {
        await oAuthSignIn("github");
      }}
    >
      <Github className="size-5" />
      Login with GitHub
    </button>
  );
}
