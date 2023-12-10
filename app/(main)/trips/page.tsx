import React from "react";

import { getCurrentUser } from "@/server/get-current-user";
import { redirect } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { Container } from "@/components/container";
import { TripCard } from "@/components/trip-card";
import { getBookings } from "@/server/get-bookings";

export default async function Trips() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const trips = await getBookings({
    tenantId: currentUser.id,
  });

  if (trips.length === 0) {
    return (
      <EmptyState
        title="No trips."
        description="Looks like you haven't booked any trips yet."
      />
    );
  }

  return (
    <Container>
      <div className="flex flex-col items-start justify-start gap-2">
        <h1 className="text-2xl font-semibold text-foreground">Your trips</h1>
        <p className="text-muted-foreground">
          Here are all the trips that you have booked.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {trips.map((trip) => (
          <TripCard listing={trip.listing} booking={trip} key={trip.id} />
        ))}
      </div>
    </Container>
  );
}
