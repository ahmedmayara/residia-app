"use client";

import React from "react";

import { Dialog } from "./dialog";
import { useFiltersDialog } from "@/hooks/useFiltersDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { CountrySelect, CountrySelectValue } from "../country-select";
import qs from "query-string";
import { DialogHeading } from "./dialog-heading";
import { Separator } from "../ui/separator";
import { Calendar } from "../calendar";
import { formatISO } from "date-fns";
import { Counter } from "../counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export function FiltersDialog() {
  const filtersDialog = useFiltersDialog();
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = React.useState(STEPS.LOCATION);
  const [country, setCountry] = React.useState<CountrySelectValue>();
  const [maxGuests, setmaxGuests] = React.useState(1);
  const [roomCount, setroomCount] = React.useState(1);
  const [bathroomCount, setBathroomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../map").then((mod) => mod.Map), {
        loading: () => <Skeleton className="h-[40vh] rounded-lg" />,
        ssr: false,
      }),
    [country],
  );

  const onBack = React.useCallback(() => {
    setStep((prev) => prev - 1);
  }, [step]);

  const onNext = React.useCallback(() => {
    setStep((prev) => prev + 1);
  }, [step]);

  const onApply = React.useCallback(() => {
    if (step !== STEPS.INFO) {
      onNext();
      return;
    }

    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...query,
      country: country?.label,
      maxGuests,
      roomCount,
      bathroomCount,
    };

    if (dateRange?.startDate) {
      updatedQuery.checkIn = formatISO(dateRange?.startDate);
    }

    if (dateRange?.endDate) {
      updatedQuery.checkOut = formatISO(dateRange?.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);

    filtersDialog.onOpenChange(false);

    router.push(url);
  }, [
    step,
    country,
    maxGuests,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    router,
    filtersDialog,
    onNext,
  ]);

  let bodyContent = (
    <div className="flex flex-col space-y-4">
      <DialogHeading
        title="Where are you going?"
        subtitle="Choose a country to find your dream home."
      />

      <CountrySelect
        value={country}
        onValueChange={(value) => {
          setCountry(value);
        }}
      />

      <Separator />

      <Map center={country?.latlang} className="h-[40vh]" />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col space-y-4">
        <DialogHeading
          title="When are you going?"
          subtitle="Choose a date range to find your dream home."
        />

        <Calendar
          value={dateRange}
          onChange={(value) => {
            setDateRange(value.selection);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeading
          title="Basic information"
          subtitle="Fill out the information below to find your dream home."
        />

        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={maxGuests}
          onCounterChange={(value) => setmaxGuests(value)}
        />

        <Separator />

        <Counter
          title="Rooms"
          subtitle="How many rooms are needed?"
          value={roomCount}
          onCounterChange={(value) => setroomCount(value)}
        />

        <Separator />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms are needed?"
          value={bathroomCount}
          onCounterChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Dialog
      open={filtersDialog.open}
      disabled={isLoading}
      title="Filters"
      body={bodyContent}
      actionLabel={step === STEPS.INFO ? "Apply" : "Next"}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={step === STEPS.LOCATION ? undefined : "Back"}
      onSubmit={onApply}
      onClose={() => filtersDialog.onOpenChange(false)}
    />
  );
}
