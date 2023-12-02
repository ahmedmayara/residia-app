"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRouter } from "next/navigation";
import { Booking, Listing, User } from "@prisma/client";
import Image from "next/image";
import { FavoriteButton } from "./favorite-button";
import { useCountries } from "@/hooks/useCountries";

interface ListingCardProps {
  listing: Listing;
  host?: User;
  booking?: Booking;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

export function ListingCard({
  listing,
  host,
  booking,
  onAction,
  disabled,
  actionLabel,
  actionId,
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
    <div
      onClick={() => {
        if (disabled) return;
        router.push(`/listings/${listing.id}`);
      }}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
          }}
          className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200"
        >
          {listing.images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={image}
                alt="Listing image"
                width={500}
                height={500}
                className="h-full w-full rounded-xl object-cover object-center"
              />
              <div className="absolute right-3 top-3">
                <FavoriteButton
                  listingId={listing.id}
                  currentUser={currentUser}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

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
