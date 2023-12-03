import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { PropertyCard } from "@/components/property-card";
import { getCurrentUser } from "@/server/get-current-user";
import { getListings } from "@/server/get-listings";

import { redirect } from "next/navigation";

export default async function Properties() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const listings = await getListings({
    userId: currentUser?.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties"
        description="Looks like you haven't added any properties yet."
      />
    );
  }

  return (
    <Container>
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Your properties
        </h1>
        <p className="text-muted-foreground">
          Here are all the properties you have added.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <PropertyCard listing={listing} key={listing.id} />
        ))}
      </div>
    </Container>
  );
}
