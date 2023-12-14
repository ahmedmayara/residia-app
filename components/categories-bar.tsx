"use client";

import React from "react";

import { usePathname, useSearchParams } from "next/navigation";

import { Container } from "./container";
import { CategoryBarItem } from "./category-bar-item";

import { categories } from "@/constants";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function CategoriesBar() {
  const params = useSearchParams();
  const type = params?.get("type");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <ScrollArea>
        <div className="flex flex-row items-center justify-between pt-4">
          {categories.map((item) => (
            <CategoryBarItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={item.label === type}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Container>
  );
}
