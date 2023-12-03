"use server";

import { db } from "@/db/prisma";

export interface GetListingsParams {
  hostId?: string;
}

export async function getListings(params: GetListingsParams) {
  try {
    const { hostId } = params;

    let query: any = {};

    if (hostId) {
      query.hostId = hostId;
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
    throw new Error("Unable to fetch listings." + error);
  }
}
