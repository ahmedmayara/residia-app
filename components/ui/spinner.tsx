import { Loader } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-10 w-10",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export function Spinner({ size }: SpinnerProps) {
  return <Loader className={cn(spinnerVariants({ size }))} />;
}
