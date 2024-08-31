"use client";

import Link from "next/link";

interface ButtonProps {
  href: string;
  text: string;
}

function CustomButton({ href, text }: ButtonProps) {
  return (
    <Link
      href={href}
      className="bg-black text-white transition duration-300 rounded-lg py-2 px-6 border hover:bg-white hover:border-black hover:text-black"
    >
      {text}
    </Link>
  );
}

export default CustomButton;
