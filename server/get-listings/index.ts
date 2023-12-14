"use server";

import { db } from "@/db/prisma";

export interface GetListingsParams {
  hostId?: string;
  maxGuests?: number;
  roomCount?: number;
  bathroomCount?: number;
  checkIn?: string;
  checkOut?: string;
  country?: string;
  type?: string;
}

export async function getListings(params: GetListingsParams) {
  try {
    const {
      hostId,
      maxGuests,
      roomCount,
      bathroomCount,
      checkIn,
      checkOut,
      country,
      type,
    } = params;

    let query: any = {};

    if (hostId) {
      query.hostId = hostId;
    }

    if (maxGuests) {
      query.maxGuests = {
        gte: +maxGuests,
      };
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (country) {
      query.country = country;
    }

    if (checkIn && checkOut) {
      query.NOT = {
        bookings: {
          some: {
            OR: [
              {
                checkOut: { gte: checkIn },
                checkIn: { lte: checkIn },
              },
              {
                checkIn: { lte: checkOut },
                checkOut: { gte: checkOut },
              },
            ],
          },
        },
      };
    }

    if (type) {
      query.type = type;
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
