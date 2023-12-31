"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Booking, Listing, User } from "@prisma/client";

import { useCountries } from "@/hooks/useCountries";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FavoriteButton } from "@/components/favorite-button";

interface ListingCardProps {
  listing: Listing;
  host?: User;
  booking?: Booking;
  currentUser?: User | null;
}

export function ListingCard({
  listing,
  host,
  booking,
  currentUser,
}: ListingCardProps) {
  const router = useRouter();

  const { getByValue } = useCountries();

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
    <div className="group col-span-1 cursor-pointer">
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
          <div className="absolute right-3 top-3">
            <FavoriteButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </Carousel>
        <div className="mt-2 flex flex-col text-sm">
          <h1 className="font-medium">
            {location?.region}, {location?.label}
          </h1>
          <p className="font-light text-muted-foreground">
            Hosted by {host?.name}
          </p>
          <p className="font-light text-muted-foreground">
            {bookingDate || listing.type}
          </p>
          <h2 className="mt-1 font-semibold">
            ${price}
            <span className="font-light text-muted-foreground"> / night</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
