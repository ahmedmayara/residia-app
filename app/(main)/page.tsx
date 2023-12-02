import { Container } from "@/components/container";
import { ListingCard } from "@/components/listing-card";
import { getCurrentUser } from "@/server/get-current-user";
import { getListings } from "@/server/get-listings";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
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
