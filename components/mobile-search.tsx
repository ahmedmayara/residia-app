"use client";

import React from "react";

import { useFiltersDialog } from "@/hooks/useFiltersDialog";
import { SearchIcon } from "lucide-react";

import { useSearchParams } from "next/navigation";
import { useCountries } from "@/hooks/useCountries";
import { differenceInDays } from "date-fns";

export function MobileSearch() {
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
      className="w-full cursor-pointer rounded-full border py-2 shadow-sm transition-all hover:shadow-md lg:hidden"
      onClick={() => filtersDialog.onOpenChange(true)}
    >
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-2 pl-6">
          <div className="rounded-full bg-blue-900 p-2 text-white">
            <SearchIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="truncate px-6 text-sm font-medium">{countryName}</h2>
          <div className="flex gap-x-2 px-6">
            <h2 className="truncate text-xs text-muted-foreground">
              {durationValue}
            </h2>
            <h2 className="truncate text-xs text-muted-foreground">·</h2>
            <h2 className="truncate text-xs text-muted-foreground">
              {guestsValue}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
