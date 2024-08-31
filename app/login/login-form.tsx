"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GitHubAuth from "./GitHubAuth";
import toaster from "@/components/toaster";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useAuth("login");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/");
          toaster.success("Welcome To Tasker.");
        },
        onError: (error: Error) => {
          setError(error.message || "Registration failed");
          toaster.error("An error occurred. Please try again.");
        },
      }
    );
  };

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
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
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
};

export default LoginForm;
