"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface PropsI {
  user: any;
}

export default function Header(props: PropsI) {
  const { user } = props;

  return (
    <header className="w-full px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center sm:justify-between bg-blue-950">
      <Link href="/">
        <h1 className="text-2xl font-bold text-white text-center sm:text-left">
          Gamedev Wydarzenia
        </h1>
      </Link>
      <nav className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0 w-full sm:w-auto sm:justify-end gap-2 sm:gap-4">
        <Link
          className="px-4 py-2 rounded text-white font-semibold hover:bg-blue-800 transition"
          href="/dashboard"
        >
          Wydarzenia
        </Link>
        <Link
          className="px-4 py-2 rounded text-white font-semibold hover:bg-blue-800 transition"
          href="/service/admin"
        >
          Admin
        </Link>
        {user?.name && (
          <div className="flex flex-col sm:flex-row items-center sm:ml-10 mt-2 sm:mt-0">
            <p className="font-bold p-2 text-white">{user.name}</p>
            <button
              className="cursor-pointer border border-white px-4 py-2 text-white rounded hover:bg-blue-800 transition"
              onClick={() => signOut()}
            >
              wyloguj
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}