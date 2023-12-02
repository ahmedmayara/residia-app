"use client";

import React from "react";

import { usePathname, useSearchParams } from "next/navigation";

import { Container } from "./container";
import { CategoryBarItem } from "./category-bar-item";

import { categories } from "@/constants";

export function CategoriesBar() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBarItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={item.label === category}
          />
        ))}
      </div>
    </Container>
  );
}
