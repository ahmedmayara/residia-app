"use client";

import { BanIcon, Loader } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CancelTripButtonProps {
  bookingId: string | undefined;
}

export function CancelTripButton({ bookingId }: CancelTripButtonProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const onSubmit = React.useCallback(
    (id: string | undefined) => {
      setIsDeleting(true);

      axios
        .delete(`/api/bookings/${id}`)
        .then(() => {
          toast.success("Trip cancelled");
          setIsDeleting(false);
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
          setIsDeleting(false);
        })
        .finally(() => {
          setIsDeleting(false);
        });
    },
    [router],
  );

  return (
    <div className="relative cursor-pointer transition">
      <Button
        size="icon"
        className="rounded-full"
        variant="destructive"
        onClick={() => onSubmit(bookingId)}
        disabled={isDeleting}
      >
        {!isDeleting && (
          <>
            <BanIcon size={18} className="text-white" />
            <span className="sr-only">Cancel trip</span>
          </>
        )}
        {isDeleting && <Loader size={18} className="animate-spin" />}
      </Button>
    </div>
  );
}
