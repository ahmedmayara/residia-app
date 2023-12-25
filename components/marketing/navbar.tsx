import React from "react";

import { User } from "@prisma/client";
import { GlobeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CategoriesBar } from "@/components/categories-bar";
import { Container } from "@/components/container";
import { HostButton } from "@/components/host-button";
import { Logo } from "@/components/marketing/logo";
import { MobileHostButton } from "@/components/mobile-host-button";
import { MobileSearch } from "@/components/mobile-search";
import { Search } from "@/components/search";
import { UserButton } from "@/components/user-button";

interface NavbarProps {
  currentUser: User | null;
}

export function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed z-10 w-full bg-background">
      <div className="border-b py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            <Logo />
            <Search />
            <MobileSearch />
            <div className="flex flex-row items-center gap-2 md:gap-4">
              <div className="hidden lg:flex">
                <HostButton currentUser={currentUser} />
                <Button variant="ghost" size="icon" className="rounded-full">
                  <GlobeIcon className="h-4 w-4" />
                </Button>
              </div>
              <UserButton currentUser={currentUser} />
              <MobileHostButton currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>

      <CategoriesBar />
    </div>
  );
}
