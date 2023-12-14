export const dynamic = "force-dynamic";

import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { ListingCard } from "@/components/listing-card";
import { getCurrentUser } from "@/server/get-current-user";
import { GetListingsParams, getListings } from "@/server/get-listings";

interface HomeProps {
  searchParams: GetListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No listings were found."
        description="Try adjusting your search or hosting your own listing."
        showResetButton
      />
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            listing={listing}
            host={listing.host}
            currentUser={currentUser}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
}
