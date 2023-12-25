"use client";

import React from "react";

import { Booking, User } from "@prisma/client";
import Image from "next/image";

import { ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ListingHeading } from "@/components/listing-heading";
import { SaveButton } from "@/components/save-button";
import { ListingInfo } from "@/components/listing-info";
import { ListingBooking } from "@/components/listing-booking";
import { getListing } from "@/server/get-listing";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useSignInDialog } from "@/hooks/useSignInDialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Range } from "react-date-range";
import { PhotosDrawer } from "./photos-drawer";

interface ListingClientProps {
  bookings?: Booking[];
  listing: Awaited<ReturnType<typeof getListing>>;
  currentUser?: User | null;
}

const intialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export function ListingClient({
  bookings,
  listing,
  currentUser,
}: ListingClientProps) {
  const signInDialog = useSignInDialog();
  const router = useRouter();

  const disabledDates = React.useMemo(() => {
    let dates: Date[] = [];

    bookings?.forEach((booking) => {
      const range = eachDayOfInterval({
        start: new Date(booking.checkIn),
        end: new Date(booking.checkOut),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [bookings]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(listing?.price);
  const [dateRange, setDateRange] = React.useState<Range>(intialDateRange);

  const onSubmit = React.useCallback(() => {
    if (!currentUser) {
      return signInDialog.onOpenChange(true);
    }

    setIsLoading(true);

    axios
      .post("/api/bookings", {
        totalPrice,
        checkIn: dateRange?.startDate,
        checkOut: dateRange?.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Booking created successfully");
        setDateRange(intialDateRange);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, dateRange, listing, totalPrice, router, signInDialog]);

  React.useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      );

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing]);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
      <div className="mt-3 flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <ListingHeading
            title={listing?.title as string}
            subtitle={listing?.country as string}
          />
          <div className="flex flex-row items-center gap-3">
            <Button size="sm" variant="ghost" className="gap-x-2">
              <ShareIcon className="h-4 w-4" />
              <span>Share</span>
            </Button>

            <SaveButton listingId={listing?.id!} currentUser={currentUser!} />
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="col-span-2">
            <Image
              className="h-auto w-full rounded-lg"
              src={listing?.images[0] as string}
              alt=""
              width={1200}
              height={800}
              style={{ objectFit: "cover", aspectRatio: "4 / 3" }}
            />
          </div>
          <div className="col-span-1 space-y-3">
            {listing?.images
              .slice(1, 3)
              .map((image) => (
                <Image
                  className="h-auto w-full rounded-lg"
                  src={image as string}
                  alt=""
                  width={500}
                  height={1000}
                  key={image}
                  style={{ objectFit: "cover", aspectRatio: "4 / 3" }}
                />
              ))}
          </div>
          <div className="col-span-1 space-y-3">
            {listing?.images
              .slice(3, 5)
              .map((image) => (
                <Image
                  className="h-auto w-full rounded-lg"
                  src={image as string}
                  alt=""
                  width={500}
                  height={1000}
                  key={image}
                  style={{ objectFit: "cover", aspectRatio: "4 / 3" }}
                />
              ))}
          </div>

          <div className="absolute bottom-4 right-4">
            <PhotosDrawer listing={listing!} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            host={listing?.host!}
            type={listing?.type!}
            description={listing?.description!}
            roomCount={listing?.roomCount!}
            bathroomCount={listing?.bathroomCount!}
            guestsCount={listing?.maxGuests!}
            location={listing?.country!}
          />

          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingBooking
              price={listing?.price!}
              dateRange={dateRange}
              totalPrice={totalPrice}
              onChangeDateRange={setDateRange}
              onSubmit={onSubmit}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
