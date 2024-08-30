"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toaster from "@/components/toaster";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        fullName: formData.get("fullName"),
      }),
    });

    if (response.ok) {
      router.push("/login");
      toaster.success(
        "Registration successful! Please verify your email and log in."
      );
    } else {
      const { error } = await response.json();
      setError(error);
      toaster.error("An error occurred. Please try again.");
    }
  }

  return (
    <section className="h-[calc(100vh-57px)] flex justify-center items-center">
      <div className="mx-auto max-w-sm bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-gray-600">Create a new account</p>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <form
            id="register-form"
            onSubmit={handleSubmit}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                className="border p-2 rounded"
              />
            </div>
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
                minLength={6}
                name="password"
                id="password"
                type="password"
                required
                className="border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </button>
          </form>
          {error && <p className="text-red-600">{error}</p>}
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="underline text-blue-600">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
