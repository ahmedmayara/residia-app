"use client";

import { useFavorite } from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import React from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface FavoriteButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export function FavoriteButton({
  listingId,
  currentUser,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={cn(isFavorite ? "fill-rose-500" : "fill-foreground/60")}
      />
    </div>
  );
}
