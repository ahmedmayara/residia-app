import { NextResponse } from "next/server";

import { getCurrentUser } from "@/server/get-current-user";
import { db } from "@/db/prisma";

interface RouteParams {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: RouteParams },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response(null, {
        status: 401,
        statusText: "Unauthorized.",
      });
    }

    const { id } = params;

    if (!id || typeof id !== "string") {
      return new Response(null, {
        status: 400,
        statusText: "Bad request.",
      });
    }

    const booking = await db.booking.deleteMany({
      where: {
        id: id,
        OR: [
          {
            tenantId: currentUser.id,
          },
          {
            listing: {
              hostId: currentUser.id,
            },
          },
        ],
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal server error.",
    });
  }
}
