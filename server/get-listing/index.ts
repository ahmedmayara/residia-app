"use server";

import { db } from "@/db/prisma";

export async function getListing(id: string) {
  try {
    const listing = await db.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        host: true,
      },
    });

    return listing;
  } catch (error) {
    throw new Error("Unable to fetch listing. " + error);
  }
}
