import { NextResponse } from "next/server";

import { getCurrentUser } from "@/server/get-current-user";
import { db } from "@/db/prisma";

interface RouteParams {
  id: string;
}

export async function POST(
  request: Request,
  { params }: { params: RouteParams },
) {
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

  let favoriteListings = [...(currentUser.favoriteListings || [])];

  favoriteListings.push(id);

  const updatedUser = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteListings,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: RouteParams },
) {
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

  let favoriteListings = [...(currentUser.favoriteListings || [])];

  favoriteListings = favoriteListings.filter((listingId) => listingId !== id);

  const updatedUser = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteListings,
    },
  });

  return NextResponse.json(updatedUser);
}
