"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Booking, Listing } from "@prisma/client";
import { useCountries } from "@/hooks/useCountries";
import { DeletePropertyButton } from "./delete-property-button";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

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
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
          }}
          className="group relative aspect-square w-full overflow-hidden rounded-xl bg-muted"
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
            </SwiperSlide>
          ))}
        </Swiper>

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
