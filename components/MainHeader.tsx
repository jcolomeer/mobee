"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <>
      <header className="flex flex-row items-center px-64 gap-12 bg-beeBrownHeader h-16 mb-8 font-switzer font-medium text-sm">
        <img
          src="/logo.png"
          alt="logo"
          className="mr-auto justify-start w-24"
        />
        <nav className="flex flex-row gap-10 uppercase">
          <Link href="/home">Home</Link>
          <Link href="/films">Films</Link>
          <Link href="/lists">Lists</Link>
          <Link href="/members">Members</Link>
        </nav>
        <form id="search-bar" className="relative flex flex-row items-center">
          <input
            type="text"
            className="h-7 rounded-sm text-beeBrownBackground bg-beeBeig placeholder:text-beeBrownBackground pl-2 placeholder:opacity-50"
            placeholder="Search"
          />
          <svg
            className="absolute right-2 w-4 h-4 text-beeBrownHeader "
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z"
            />
          </svg>
        </form>
        {children}
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      </header>
    </>
  );
}