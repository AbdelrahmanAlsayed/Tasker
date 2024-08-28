"use client";

import { CreateUserInput, createUserSchema } from "@/lib/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpWithEmailAndPassword } from "../_actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toaster from "@/components/toaster";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = (values) => {
    startTransition(async () => {
      const result = await signUpWithEmailAndPassword({
        data: values,
        emailRedirectTo: `${location.origin}/auth/callback`,
      });
      const { error } = JSON.parse(result);
      if (error?.message) {
        toaster.error(error.message);
        console.log("Error message", error.message);
        reset({ password: "" });
        return;
      }
      toaster.success("registered successfully");

      router.push("/login");
    });
  };

  const input_style =
    "form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white border border-gray-300 rounded-lg transition duration-300 ease-in-out focus:border-black focus:ring-0";

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-6">
        <input
          {...register("name")}
          placeholder="Name"
          className={`${input_style}`}
        />
        {errors["name"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["name"]?.message as string}
          </span>
        )}
      </div>
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
      <div className="mb-6">
        <input
          type="password"
          {...register("passwordConfirm")}
          placeholder="Confirm Password"
          className={`${input_style}`}
        />
        {errors["passwordConfirm"] && (
          <span className="text-red-500 text-xs pt-1 block">
            {errors["passwordConfirm"]?.message as string}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="inline-block px-7 py-4 bg-black text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-300 ease-in-out w-full"
        disabled={isPending}
      >
        {isPending ? "loading..." : "Sign Up"}
      </button>
    </form>
  );
};
