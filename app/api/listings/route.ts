import { db } from "@/db/prisma";
import { HostHomeSchema } from "@/schemas";
import { getCurrentUser } from "@/server/get-current-user";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response(null, {
        status: 401,
        statusText: "Unauthorized.",
      });
    }

    const body = await request.json();

    const result = HostHomeSchema.safeParse(body);

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

    const {
      title,
      description,
      images,
      type,
      price,
      rooms,
      bathrooms,
      guests,
      country,
      city,
      address,
    } = result.data;

    const listing = await db.listing.create({
      data: {
        title,
        description,
        images,
        type,
        price,
        roomCount: rooms,
        bathroomCount: bathrooms,
        maxGuests: guests,
        country: country.label,
        city,
        address,
        host: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    if (!listing) {
      return new Response(null, {
        status: 500,
        statusText: "Something went wrong.",
      });
    }

    return new Response(JSON.stringify(listing), {
      status: 201,
      statusText: "Created.",
    });
  } catch (error) {
    console.error(error);

    return new Response(null, {
      status: 500,
      statusText: "Something went wrong.",
    });
  }
}
