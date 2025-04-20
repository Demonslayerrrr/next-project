"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface PropsI {
  user: any;
}

export default function Header(props: PropsI) {
  const { user } = props;

  return (
    <div className="py-4 flex items-center justify-between">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Gamedev Wydarzenia</h1>
      </Link>
      <div className="flex items-center">
        <Link className="p-2" href={"/dashboard"}>
          Wydarzenia
        </Link>
        <Link className="p-2" href={"/service/admin"}>
          Admin
        </Link>
        {user?.name && (
          <div className="flex ml-10 ">
            <p className="font-bold p-2">{user.name}</p>
            <button
              className="cursor-pointer border border-white p-2"
              onClick={() => signOut()}
            >
              wyloguj
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
