"use client";

import React from "react";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSignUpDialog } from "@/hooks/useSignUpDialog";
import { useSignInDialog } from "@/hooks/useSignInDialog";
import { useHostDialog } from "@/hooks/useHostDialog";

import { useRouter } from "next/navigation";

interface UserButtonProps {
  currentUser: User | null;
}

export function UserButton({ currentUser }: UserButtonProps) {
  const signUpDialog = useSignUpDialog();
  const signInDialog = useSignInDialog();
  const hostDialog = useHostDialog();

  const router = useRouter();

  const handleOpenHostDialog = () => {
    if (!currentUser) {
      signInDialog.onOpenChange(true);
      return;
    }

    hostDialog.onOpenChange(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer rounded-full border px-2.5 py-1.5 shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-row items-center gap-2.5">
              <MenuIcon size={18} />
              <Avatar className="h-8 w-8">
                {currentUser?.image && (
                  <AvatarImage src={currentUser?.image} alt="Avatar" />
                )}
                <AvatarFallback asChild>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    className="fill-slate-500"
                  >
                    <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
                  </svg>
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          {currentUser && (
            <div className="flex flex-col space-y-2 p-2">
              <p className="text-xs font-medium text-muted-foreground">
                Signed in as
              </p>

              <DropdownMenuSeparator />

              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">
                  {currentUser?.name}
                </p>

                <p className="text-xs font-medium text-muted-foreground">
                  {currentUser?.email}
                </p>
              </div>

              <DropdownMenuSeparator />
            </div>
          )}

          {!currentUser && (
            <>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => signUpDialog.onOpenChange(true)}
                >
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signInDialog.onOpenChange(true)}
                >
                  Sign in
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuGroup>
            {currentUser && (
              <>
                <DropdownMenuItem>My trips</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/properties")}>
                  My properties
                </DropdownMenuItem>
                <DropdownMenuItem>My reservations</DropdownMenuItem>
                <DropdownMenuItem>My favorites</DropdownMenuItem>

                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuItem onClick={handleOpenHostDialog}>
              Host your home
            </DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>

            {currentUser && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}