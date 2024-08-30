"use client";

import Link from "next/link";

export default function ProfileLink() {
  return (
    <Link href="/profile">
      <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
        Profile
      </button>
    </Link>
  );
}
