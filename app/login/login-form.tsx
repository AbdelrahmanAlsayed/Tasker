"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GitHubAuth from "./GitHubAuth";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      const result = await response.json();
      setError(result.error || "Unknown error occurred");
    }
  }

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <div className="mx-auto max-w-sm bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold">Login</h2>
          <p className="text-gray-600">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <form id="login-form" onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border p-2 rounded"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                minLength={6}
                required
                className="border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-600">{error}</p>}
          <GitHubAuth />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline text-blue-600">
              Register
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
