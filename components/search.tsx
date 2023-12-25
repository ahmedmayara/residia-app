"use client";

import React from "react";

import { useSearchParams } from "next/navigation";
import { differenceInDays } from "date-fns";
import { SearchIcon } from "lucide-react";

import { useCountries } from "@/hooks/useCountries";
import { useFiltersDialog } from "@/hooks/useFiltersDialog";

export function Search() {
  const filtersDialog = useFiltersDialog();
  const params = useSearchParams();

  const { getByValue } = useCountries();

  const country = params?.get("country");
  const checkIn = params?.get("checkIn");
  const checkOut = params?.get("checkOut");
  const guests = params?.get("maxGuests");

  const countryName = React.useMemo(() => {
    if (country) {
      const countryObj = getByValue(country);
      if (countryObj) {
        return countryObj.label;
      }
    }
    return "Anywhere";
  }, [country, getByValue]);

  const durationValue = React.useMemo(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      let diff = differenceInDays(checkOutDate, checkInDate);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} night${diff > 1 ? "s" : ""}`;
    }
    return "Any week";
  }, [checkIn, checkOut]);

  const guestsValue = React.useMemo(() => {
    if (guests) {
      return `${guests} guest${+guests > 1 ? "s" : ""}`;
    }
    return "Add guests";
  }, [guests]);
  return (
    <div
      className="hidden cursor-pointer rounded-full border py-2 shadow-sm transition-all hover:shadow-md lg:block lg:w-auto"
      onClick={() => filtersDialog.onOpenChange(true)}
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="truncate px-6 text-sm font-medium">{countryName}</h2>
        <div className="hidden flex-1 border-x px-6 text-center text-sm font-medium sm:block">
          <h2 className="truncate">{durationValue}</h2>
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-4">
          <h2 className="truncate text-center text-sm font-medium text-muted-foreground">
            {guestsValue}
          </h2>
          <div className="rounded-full bg-blue-900 p-2 text-white">
            <SearchIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
