"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="poppins">
      <Navbar />
    </div>
  );
}

function Navbar() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 flex flex-col sm:flex-row justify-between items-center">
      <Logo />
      <Buttons />
    </div>
  );
}

function Logo() {
  return (
    <div className="text-xl">
      <span className="text-mainColor font-bold">Code</span>
      <span className="text-slate-400">Note</span>
    </div>
  );
}

function Buttons() {
  const { userId } = useAuth();
  return (
    <>
      {userId ? (
        <Link
          href="/my-notes"
          className="px-6 py-2.5 bg-mainColor text-white rounded-md text-sm max-sm:w-full"
        >
          Go to the app
        </Link>
      ) : (
        <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:mt-10 max-sm:w-4/6">
          <Link
            href="/sign-in"
            className="px-6 py-2.5 bg-mainColor text-white rounded-md text-sm max-sm:w-full"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-2.5 border border-mainColor text-mainColor rounded-md text-sm max-sm:w-full"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}
