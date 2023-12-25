"use client";

import React from "react";

import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export function CategoryBox({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryBoxProps) {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-foreground",
        selected ? "border-foreground" : "border-2",
      )}
    >
      <Icon size={30} className="text-foreground" />
      <h1 className="font-semibold">{label}</h1>
    </div>
  );
}
