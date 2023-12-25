"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface CategoryBarItemProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export function CategoryBarItem({
  icon: Icon,
  label,
  selected,
}: CategoryBarItemProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      type: label,
    };

    if (params?.get("type") === label) {
      delete updatedQuery.type;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 text-muted-foreground transition-all hover:text-foreground",
        selected ? "border-foreground text-foreground" : "border-transparent",
      )}
    >
      <Icon size={26} />
      <h1 className="text-sm font-medium">{label}</h1>
    </div>
  );
}
