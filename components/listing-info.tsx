"use client";

import React from "react";

import dynamic from "next/dynamic";
import { User } from "@prisma/client";

import { useCountries } from "@/hooks/useCountries";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import("./map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => <Skeleton className="h-[50vh]" />,
});

interface ListingInfoProps {
  host: User;
  type: string;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestsCount: number;
  location: string;
}

export function ListingInfo({
  host,
  type,
  description,
  roomCount,
  bathroomCount,
  guestsCount,
  location,
}: ListingInfoProps) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(location)?.latlang;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-lg font-medium">
          <h1>Hosted by {host.name}</h1>
          <Avatar className="h-8 w-8">
            <AvatarFallback asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                className="fill-slate-500"
              >
                <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
              </svg>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-muted-foreground">
          <p>{guestsCount} guests</p>
          <p>{roomCount} bedrooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-muted-foreground">·</p>
          <p className="text-muted-foreground">{type}</p>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Separator />

      <Map center={coordinates} className="h-[50vh]" />
    </div>
  );
}
