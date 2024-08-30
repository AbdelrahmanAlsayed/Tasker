"use client";

import Link from "next/link";

type ClientButtonsProps = {
  isAuthenticated: boolean;
};

export default function HomePageButtons({
  isAuthenticated,
}: ClientButtonsProps) {
  return (
    <>
      {isAuthenticated ? (
        <Link
          href="/todos"
          className="px-4 py-2 bg-black text-white rounded-md transition-colors duration-300 hover:bg-gray-700 hover:text-gray-100"
        >
          See Tasks
        </Link>
      ) : (
        <Link
          href="/register"
          className="px-4 py-2 bg-black text-white rounded-md transition-colors duration-300 hover:bg-gray-700 hover:text-gray-100"
        >
          Get Started
        </Link>
      )}
    </>
  );
}
