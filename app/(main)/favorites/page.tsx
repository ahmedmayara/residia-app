import React from "react";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/get-current-user";
import { getUserFavoritesListings } from "@/server/get-user-favorites-listings";

import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";
import { ListingCard } from "@/components/listing-card";

export default async function Favorites() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const favorites = await getUserFavoritesListings();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites"
        description="Looks like you haven't liked any properties yet."
      />
    );
  }
  return (
    <Container>
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Your favorites
        </h1>
        <p className="text-muted-foreground">
          Here are all the properties you have liked.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favorites.map((favorite) => (
          <ListingCard
            currentUser={currentUser}
            listing={favorite}
            key={favorite.id}
          />
        ))}
      </div>
    </Container>
  );
}
