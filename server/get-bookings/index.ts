import { db } from "@/db/prisma";

interface BookingsParams {
  id?: string;
  tenantId?: string;
  hostId?: string;
}

export default async function getBookings(params: BookingsParams) {
  try {
    const { id, tenantId, hostId } = params;

    const query: any = {};

    if (id) {
      query.listingId = id;
    }

    if (tenantId) {
      query.tenantId = tenantId;
    }

    if (hostId) {
      query.listing = {
        hostId: hostId,
      };
    }

    const bookings = await db.booking.findMany({
      where: query,
      include: {
        tenant: true,
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return bookings;
  } catch (error) {
    throw new Error("Could not get bookings. " + error);
  }
}
