"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      className="h-fit bg-blue-400 border-[1px] border-blue-500 py-2 px-1 rounded-md"
      onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
