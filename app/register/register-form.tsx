"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toaster from "@/components/toaster";
import AuthLink from "@/components/AuthLinks";
import { BeatLoader } from "react-spinners";
import GitHubAuth from "../login/GitHubAuth";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { mutate, status } = useAuth("register");

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
    <section className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <p className="text-gray-600 mb-6">
        Enter your details below to create an account
      </p>
      <form
        id="register-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Abdelrahman Alsayed"
            required
            className="border p-2 rounded-lg"
          />
        </div>
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
          className="bg-black mb-3 text-white transition duration-300 rounded-lg py-2 px-6 mt-4 border hover:bg-white hover:border-black hover:text-black"
          disabled={status === "pending"}
        >
          {status === "pending" ? (
            <BeatLoader color="#fff" size={10} />
          ) : (
            "Register"
          )}
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      <GitHubAuth />
      <AuthLink
        text="Already have an account? "
        linkText="Login"
        href="/login"
      />
    </section>
  );
};

export default RegisterForm;
