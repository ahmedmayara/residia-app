"use server";

import { db } from "@/db/prisma";

export interface GetListingsParams {
  userId?: string;
}

export async function getListings(params: GetListingsParams) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.hostId = userId;
    }

    const listings = await db.listing.findMany({
      where: query,
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
