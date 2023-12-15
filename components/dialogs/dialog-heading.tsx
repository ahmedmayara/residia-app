import React from "react";

import { cn } from "@/lib/utils";

interface DialogHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function DialogHeading({ title, subtitle, center }: DialogHeadingProps) {
  return (
    <div className={cn(center ? "text-center" : "text-start")}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="text-md mt-2 font-light text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
