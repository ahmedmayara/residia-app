"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onCounterChange: (value: number) => void;
}

export function Counter({
  title,
  subtitle,
  value,
  onCounterChange,
}: CounterProps) {
  const onAdd = React.useCallback(() => {
    onCounterChange(value + 1);
  }, [value, onCounterChange]);

  const onReduce = React.useCallback(() => {
    if (value === 1) return;

    onCounterChange(value - 1);
  }, [value, onCounterChange]);
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold">{title}</h1>
        <h2 className="text-sm text-gray-400">{subtitle}</h2>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors hover:bg-accent"
        >
          <MinusIcon size={20} />
        </div>
        <h1 className="text-xl font-semibold text-foreground">{value}</h1>
        <div
          onClick={onAdd}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors hover:bg-accent"
        >
          <PlusIcon size={20} />
        </div>
      </div>
    </div>
  );
}
