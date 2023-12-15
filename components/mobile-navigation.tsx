"use client";

import { User } from "@prisma/client";
import {
  HeartIcon,
  PlaneLandingIcon,
  SearchIcon,
  WarehouseIcon,
  UserCircleIcon,
  LogOutIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSignInDialog } from "@/hooks/useSignInDialog";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  currentUser: User | null;
}

export function MobileNavigation({ currentUser }: MobileNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const signInDialog = useSignInDialog();
  const routes = [
    {
      name: "Explore",
      icon: SearchIcon,
      href: "/",
      isVisible: true,
      active: pathname === "/",
      onClick: () => {
        router.push("/");
      },
    },
    {
      name: "Favorites",
      icon: HeartIcon,
      href: "/favorites",
      isVisible: true,
      active: pathname === "/favorites",
      onClick: () => {
        if (!currentUser) {
          signInDialog.onOpenChange(true);
        } else {
          router.push("/favorites");
        }
      },
    },
    {
      name: "Trips",
      icon: PlaneLandingIcon,
      href: "/trips",
      isVisible: currentUser !== null,
      active: pathname === "/trips",
      onClick: () => {
        router.push("/trips");
      },
    },
    {
      name: "Properties",
      icon: WarehouseIcon,
      href: "/properties",
      isVisible: currentUser !== null,
      active: pathname === "/properties",
      onClick: () => {
        router.push("/properties");
      },
    },
    {
      name: "Sign in",
      icon: UserCircleIcon,
      href: "#",
      isVisible: currentUser === null,
      active: false,
      onClick: () => signInDialog.onOpenChange(true),
    },
    {
      name: "Sign out",
      icon: LogOutIcon,
      href: "#",
      isVisible: currentUser !== null,
      active: false,
      onClick: () => {
        signOut();
      },
    },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background lg:hidden">
      <div className="flex">
        {routes.map((route) => {
          if (!route.isVisible) {
            return null;
          }
          return (
            <div
              key={route.name}
              className="flex w-full cursor-pointer flex-col items-center justify-center p-3.5 transition-all duration-300 ease-in-out hover:bg-accent"
              onClick={route.onClick}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5",
                  {
                    "text-blue-900": route.active,
                    "text-muted-foreground": !route.active,
                  },
                )}
              >
                <route.icon
                  className={cn("h-5 w-5", {
                    "text-blue-900": route.active,
                    "text-muted-foreground": !route.active,
                  })}
                />
                <h2
                  className={cn("text-xs", { "font-semibold": route.active })}
                >
                  {route.name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
