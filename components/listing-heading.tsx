"use client";

import React from "react";

import { useCountries } from "@/hooks/useCountries";

interface ListingHeadingProps {
  title: string;
  subtitle: string;
}

export function ListingHeading({ title, subtitle }: ListingHeadingProps) {
  const { getByValue } = useCountries();

  const location = React.useMemo(() => {
    const locationValue = getByValue(subtitle);

    if (locationValue) {
      return `${locationValue.region}, ${locationValue.label}`;
    }
  }, [getByValue, subtitle]);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-semibold md:text-3xl">{title}</span>
      <span className="text-md text-muted-foreground">{location}</span>
    </div>
  );
}
