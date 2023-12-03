"use client";

import { Loader, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeletePropertyButtonProps {
  listingId: string;
}

export function DeletePropertyButton({ listingId }: DeletePropertyButtonProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const onSubmit = React.useCallback(
    (id: string) => {
      setIsDeleting(true);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted");
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
        onClick={() => onSubmit(listingId)}
      >
        {!isDeleting && (
          <>
            <Trash2Icon size={18} className="text-white" />
            <span className="sr-only">Delete property</span>
          </>
        )}
        {isDeleting && <Loader size={18} className="animate-spin" />}
      </Button>
    </div>
  );
}
