"use server";

import { db } from "@/db/prisma";

export async function getListings() {
  try {
    const listings = await db.listing.findMany({
      include: {
        host: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error) {
    throw new Error("Unable to fetch listings.");
  }
}
