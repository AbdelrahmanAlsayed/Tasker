"use client";

import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "../_actions";
import useSupabaseClient from "@/lib/supabase/client";
import toaster from "@/components/toaster";
import { Github } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    startTransition(async () => {
      const result = await signInWithEmailAndPassword(values);

      const { error } = JSON.parse(result);
      if (error?.message) {
        setError(error.message);
        toaster.error(error.message);
        console.log("Error message", error.message);
        reset({ password: "" });
        return;
      }

      setError("");
      toaster.success("successfully logged in");

      router.push("/");
    });
  };

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const input_style =
    "form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-300 ease-in-out focus:border-black focus:ring-0";

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {error && (
        <p className="text-center bg-red-200 text-red-700 py-4 mb-6 rounded-lg">
          {error}
        </p>
      )}
      <div className="mb-6">
        <input
          type="email"
          {...register("email")}
          placeholder="Email address"
          className={`${input_style}`}
        />
        {errors["email"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["email"]?.message as string}
          </span>
        )}
      </div>
      <div className="mb-6">
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className={`${input_style}`}
        />
        {errors["password"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["password"]?.message as string}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="inline-block px-7 py-4 bg-black text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-300 ease-in-out w-full"
        disabled={isPending}
      >
        {isPending ? "loading..." : "Sign In"}
      </button>

      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      <a
        className="px-7 py-2 text-white bg-black font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-300 ease-in-out w-full flex justify-center items-center"
        onClick={loginWithGitHub}
        role="button"
      >
        <Github />
        Continue with GitHub
      </a>
    </form>
  );
};
