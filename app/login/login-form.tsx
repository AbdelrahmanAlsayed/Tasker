"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GitHubAuth from "./GitHubAuth";
import toaster from "@/components/toaster";
import AuthLink from "@/components/AuthLinks";
import { BeatLoader } from "react-spinners";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { mutate, status } = useAuth("login");

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
          setError(error.message || "Login failed");
          toaster.error("An error occurred. Please try again.");
        },
      }
    );
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <p className="text-gray-600 mb-6">
        Enter your email below to login to your account
      </p>
      <form
        id="login-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="dev.abdelrahman7@gmail.com"
            required
            className="border p-2 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="************"
            minLength={6}
            required
            className="border p-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="mb-4 bg-black text-white transition duration-300 rounded-lg py-2 px-6 mt-4 border hover:bg-white hover:border-black hover:text-black"
          disabled={status === "pending"}
        >
          {status === "pending" ? (
            <BeatLoader color="#fff" size={10} />
          ) : (
            "Login"
          )}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      <GitHubAuth />
      <AuthLink
        text="Don't have an account? "
        linkText="Register"
        href="/register"
      />
    </section>
  );
};

export default LoginForm;
