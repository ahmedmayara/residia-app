"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Booking, Listing } from "@prisma/client";
import { EyeIcon } from "lucide-react";

import { useCountries } from "@/hooks/useCountries";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DeletePropertyButton } from "@/components/delete-property-button";

interface PropertyCardProps {
  listing: Listing;
  booking?: Booking;
  disabled?: boolean;
}

export function PropertyCard({ listing, booking }: PropertyCardProps) {
  const { getByValue } = useCountries();
  const router = useRouter();

  const price = React.useMemo(() => {
    if (booking) {
      return booking.totalPrice;
    }

    return listing.price;
  }, [booking, listing]);

  const bookingDate = React.useMemo(() => {
    if (!booking) return null;

    const startDate = new Date(booking.checkIn);
    const endDate = new Date(booking.checkOut);

    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  }, [booking]);

  const location = React.useMemo(() => {
    if (!listing?.country) return null;

    return getByValue(listing.country);
  }, [listing, getByValue]);

  return (
    <div className="group col-span-1">
      <div className="flex w-full flex-col">
        <Carousel className="relative aspect-square w-full overflow-hidden rounded-xl bg-accent">
          <CarouselContent>
            {listing.images.map((photo) => (
              <CarouselItem key={photo}>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={photo}
                    alt={photo}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover object-center"
                    onClick={() => router.push(`/listings/${listing.id}`)}
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 transform opacity-75 transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-100 group-hover:flex" />
          <CarouselNext className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 transform opacity-75 transition-transform duration-200 ease-in-out hover:scale-110 hover:opacity-100 group-hover:flex" />
          <div className="absolute right-3 top-3 opacity-0 transition-all group-hover:opacity-100">
            <div className="flex flex-row items-center justify-between gap-x-2">
              <Button
                size="icon"
                className="rounded-full"
                variant="secondary"
                onClick={() => router.push(`/listings/${listing.id}`)}
              >
                <EyeIcon size={18} className="text-foreground" />
                <span className="sr-only">View property</span>
              </Button>
              <DeletePropertyButton listingId={listing.id} />
            </div>
          </div>
        </Carousel>
        <div className="mt-2 flex flex-col text-sm">
          <div className="flex flex-row items-center justify-between gap-2">
            <h1 className="font-medium">
              {location?.region}, {location?.label}
            </h1>
            <p className="font-light text-muted-foreground">
              {bookingDate || listing.type}
            </p>
          </div>
          <h2 className="mt-1 font-semibold">
            ${price}
            <span className="font-light text-muted-foreground"> / night</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
