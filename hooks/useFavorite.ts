import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

import { User } from "@prisma/client";

import { useSignInDialog } from "./useSignInDialog";

interface UseFavorite {
  listingId: string;
  currentUser?: User | null;
}

export const useFavorite = ({ listingId, currentUser }: UseFavorite) => {
  const router = useRouter();
  const signInDialog = useSignInDialog();

  const isFavorite = useMemo(() => {
    const favoriteListings = currentUser?.favoriteListings || [];

    return favoriteListings.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      event.stopPropagation();

      if (!currentUser) {
        return signInDialog.onOpenChange(true);
      }

      try {
        let request;

        if (isFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();

        router.refresh();

        toast.success(
          isFavorite
            ? "Listing removed from favorites."
            : "Listing added to favorites.",
        );
      } catch (error) {
        toast.error("Unable to add listing to favorites.");
      }
    },
    [currentUser, isFavorite, listingId, router, signInDialog],
  );

  return {
    isFavorite,
    toggleFavorite,
  };
};
