"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Adjust the import path as needed
import GitHubAuth from "../login/GitHubAuth";
import toaster from "@/components/toaster";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useAuth("register");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    mutate(
      { email, password, fullName },
      {
        onSuccess: () => {
          router.push("/login");
          toaster.success(
            "Registration successful! Please verify your email and log in."
          );
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
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-gray-600">
            Enter your details below to create an account
          </p>
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
              Register
            </button>
          </form>
          {error && <p className="text-red-600">{error}</p>}
          <GitHubAuth />
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
};

export default RegisterForm;
