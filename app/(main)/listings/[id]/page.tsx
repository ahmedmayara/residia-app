import { getListing } from "@/server/get-listing";

import { getCurrentUser } from "@/server/get-current-user";
import { ListingClient } from "@/components/listing-client";
import getBookings from "@/server/get-bookings";

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
