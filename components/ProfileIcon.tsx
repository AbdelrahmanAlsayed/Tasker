"use client";

import { signOut } from "@/app/_actions";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { User, List, UserCircle, LogOut } from "lucide-react";
import toaster from "./toaster";

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toaster.success("Signed out successfully!");
    } catch (error) {
      toaster.error("Sign out failed. Please try again.");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownInformationButton"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full flex items-center justify-center"
        type="button"
      >
        <User className="w-5 h-5 text-gray-700" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id="dropdownInformation"
          className="z-10 absolute right-0 mt-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 border border-gray-200"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              <Link
                href="/todos"
                className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                <List className="w-4 h-4 mr-2" aria-hidden="true" />
                Tasks
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                <UserCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                Profile
              </Link>
            </li>
          </ul>
          <div className="py-2 border-t border-gray-200">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 text-left"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
