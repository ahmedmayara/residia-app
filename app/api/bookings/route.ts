import { NextResponse } from "next/server";

import { db } from "@/db/prisma";
import { BookingSchema } from "@/schemas";
import { getCurrentUser } from "@/server/get-current-user";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response(null, {
      status: 401,
      statusText: "Unauthorized.",
    });
  }

  const body = await request.json();

  const result = BookingSchema.safeParse(body);

  if (!result.success) {
    return new Response(
      JSON.stringify(
        result.error.issues.map((i) => {
          return {
            message: i.message,
          };
        }),
      ),
      { status: 400 },
    );
  }

  const { totalPrice, checkIn, checkOut, listingId } = result.data;

  const listingAndBooking = await db.listing.update({
    where: {
      id: listingId,
    },
    data: {
      bookings: {
        create: {
          totalPrice,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          tenant: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(listingAndBooking);
}
