"use server";

import { db } from "@/db/prisma";

import { getCurrentUser } from "../get-current-user";

export async function getUserFavoritesListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found.");
    }

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteListings ?? [])],
        },
      },
    });

    return favorites;
  } catch (error) {
    throw new Error("Unable to fetch favorites." + error);
  }
}
