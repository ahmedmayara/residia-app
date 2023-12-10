import React from "react";

import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <Container>
      <div className="flex flex-col items-start justify-start gap-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-1/5" />
      </div>
      <div className="grid grid-cols-1 gap-8 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {[...Array(12)].map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}

function ListingCardSkeleton() {
  return (
    <div className="col-span-1">
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="relative aspect-square w-full animate-pulse overflow-hidden rounded-xl" />
        <div className="mt-1 flex flex-col gap-1.5">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/5" />
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}
