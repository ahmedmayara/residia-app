import { db } from "@/db/prisma";
import { getCurrentUser } from "@/server/get-current-user";

interface Params {
  id?: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
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

    const listing = await db.listing.findUnique({
      where: {
        id,
      },
    });

    if (!listing) {
      return new Response(null, {
        status: 404,
        statusText: "Not found.",
      });
    }

    if (listing.hostId !== currentUser.id) {
      return new Response(null, {
        status: 403,
        statusText: "Forbidden.",
      });
    }

    await db.listing.delete({
      where: {
        id,
      },
    });

    return new Response(null, {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal server error.",
    });
  }
}
