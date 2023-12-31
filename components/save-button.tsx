"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useFavorite } from "@/hooks/useFavorite";

import { Button } from "@/components/ui/button";

interface SaveButtonProps {
  listingId: string;
  currentUser?: User;
}

export function SaveButton({ listingId, currentUser }: SaveButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <Button
      size="sm"
      variant="ghost"
      className="gap-x-2"
      onClick={toggleFavorite}
    >
      {isFavorite ? (
        <AiFillHeart className="h-4 w-4 fill-rose-500" />
      ) : (
        <AiOutlineHeart className="h-4 w-4 fill-foreground" />
      )}
      <span>Save</span>
    </Button>
  );
}
