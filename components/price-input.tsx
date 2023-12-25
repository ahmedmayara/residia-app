"use client";

import React from "react";

import { Input } from "@/components/ui/input";

interface PriceInputProps {
  value: number;
  onValueChange: (value: number) => void;
}

export function PriceInput({ value, onValueChange }: PriceInputProps) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => {
        onValueChange(Number(e.target.value));
      }}
      placeholder="Price per night"
      className="w-full"
      min={1}
      max={10000}
      step={1}
    />
  );
}
