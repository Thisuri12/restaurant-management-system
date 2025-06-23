"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 mt-2 mb-2 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={130} height={30} />
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium font-sora"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Sign Up or log in
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors font-medium font-sora"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Account
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
