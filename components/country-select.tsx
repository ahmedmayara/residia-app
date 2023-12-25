"use client";

import { useCountries } from "@/hooks/useCountries";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface CountrySelectValue {
  value: string;
  label: string;
  flag: string;
  latlang: number[];
  region: string;
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onValueChange: (value: CountrySelectValue) => void;
}

export function CountrySelect({ value, onValueChange }: CountrySelectProps) {
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();

  const handleValueChange = (value: string) => {
    const selectedCountry = countries.find(
      (country) => country.value === value,
    );
    if (selectedCountry) {
      onValueChange(selectedCountry);
    }
  };

  return (
    <>
      <Select value={value?.value} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <SelectGroup key={country.value}>
              <SelectItem value={country.value}>
                <div className="flex flex-row items-center gap-2">
                  <div>{country.flag}</div>
                  <div>
                    <span>{country.label},</span>{" "}
                    <span className="text-muted-foreground">
                      {country.region}
                    </span>
                  </div>
                </div>
              </SelectItem>
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
