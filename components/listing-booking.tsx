"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "./calendar";
import { Range } from "react-date-range";

interface ListingBookingProps {
  price: number;
  dateRange: Range;
  totalPrice: number | undefined;
  onChangeDateRange: (dateRange: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

export function ListingBooking({
  price,
  dateRange,
  totalPrice,
  onChangeDateRange,
  onSubmit,
  disabled,
  disabledDates,
}: ListingBookingProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex flex-row items-center gap-1 p-4">
        <h1 className="text-lg font-semibold md:text-2xl">${price}</h1>
        <p className="text-sm text-muted-foreground md:text-base">per night</p>
      </div>
      <Separator />

      <Calendar
        value={dateRange}
        onChange={(item) => onChangeDateRange(item.selection)}
        disabledDates={disabledDates}
      />

      <Separator />

      <div className="p-4">
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={disabled || !dateRange}
        >
          Reserve
        </Button>
      </div>

      <Separator />

      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold md:text-lg">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
}
