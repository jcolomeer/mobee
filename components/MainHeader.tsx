"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateDropdown from "./CreateDropdown";

interface Props {
  children: React.ReactNode;
  userId: string;
}
export default function MainHeader({ children, userId }: Props) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <>
      <header
        className={`flex relative flex-row items-center px-[16%] bg-beeBrownHeader font-openSans gap-10 h-16 text-sm justify-evenly ${
          pathname.includes("/film_details") || pathname.includes("/my_profile")
            ? ""
            : "mb-8"
        }`}
      >
        <img src="/logo.png" alt="logo" className="w-24" />
        <nav className="flex flex-row gap-8 uppercase ml-auto font-medium tracking-wide">
          <Link
            href="/home"
            className={pathname === "/home" ? "" : "opacity-50"}
          >
            Home
          </Link>
          <Link
            href="/films"
            className={pathname === "/films" ? "" : "opacity-50"}
          >
            Films
          </Link>
          <Link
            href="/lists"
            className={pathname === "/lists" ? "" : "opacity-50"}
          >
            Lists
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
          <DropdownMenuContent className="bg-beeBrownLight border-none text-beeBeig p-0 font-openSans">
            <DropdownMenuItem
              className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              onClick={() => {
                router.push("/my_profile");
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              onClick={() => {
                router.push("/my_profile/watchlist");
              }}
            >
              Watchlist
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              onClick={() => {
                router.push("/my_profile/films");
              }}
            >
              Films
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              onClick={() => {
                router.push("/my_profile/lists");
              }}
            >
              Lists
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-beeBrownBackground data-[highlighted]:bg-beeBrownLightDarker data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              onClick={() => {
                router.push("/my_profile/reviews");
              }}
            >
              Reviews
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-beeBrownLightDarker" />
            <DropdownMenuItem
              className="text-beeBrownBackground data-[highlighted]:bg-beeRed data-[highlighted]:text-beeBeig hover:cursor-pointer rounded-none"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CreateDropdown userId={userId} />
      </header>
    </>
  );
}
