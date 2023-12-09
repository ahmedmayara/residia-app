import React from "react";

import { Container } from "@/components/container";
import { Logo } from "@/components/marketing/logo";
import { Search } from "@/components/search";
import { UserButton } from "@/components/user-button";
import { Button } from "@/components/ui/button";

import { GlobeIcon } from "lucide-react";
import { User } from "@prisma/client";
import { CategoriesBar } from "../categories-bar";
import { MobileSearch } from "../mobile-search";
import { MobileHostButton } from "../mobile-host-button";
import { HostButton } from "../host-button";

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
