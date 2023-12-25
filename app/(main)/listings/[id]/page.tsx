import { getBookings } from "@/server/get-bookings";
import { getCurrentUser } from "@/server/get-current-user";
import { getListing } from "@/server/get-listing";

import { ListingClient } from "@/components/listing-client";

interface PageProps {
  id: string;
}

export default async function Page({ params }: { params: PageProps }) {
  const listing: Awaited<ReturnType<typeof getListing>> = await getListing(
    params.id,
  );
  const bookings = await getBookings(params);
  const currentUser = await getCurrentUser();
  return (
    <ListingClient
      listing={listing}
      bookings={bookings}
      currentUser={currentUser}
    />
  );
}
