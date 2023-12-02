"use client";

import Image from "next/image";

import { Listing, User } from "@prisma/client";

import { Drawer } from "vaul";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, Grid3x3Icon, ShareIcon } from "lucide-react";

import { SaveButton } from "@/components/save-button";

interface PhotosDrawerProps {
  listing: Listing;
  currentUser?: User;
}

export function PhotosDrawer({ listing, currentUser }: PhotosDrawerProps) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="gap-x-1.5 hover:bg-secondary"
        >
          <Grid3x3Icon className="h-4 w-4" />
          <span>See all photos</span>
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-neutral-800/70" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100] mt-24 flex h-[96%] flex-col rounded-t-md bg-zinc-100">
          <div className="flex items-center justify-between p-4">
            <Drawer.Close className="rounded-lg border-0 p-1 transition hover:bg-muted">
              <ChevronLeftIcon size={18} />
            </Drawer.Close>

            <div className="ml-[9.5rem] h-1.5 w-12 rounded-full bg-zinc-300" />

            <div className="flex flex-row items-center gap-3">
              <Button size="sm" variant="ghost" className="gap-x-2">
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </Button>

              <SaveButton listingId={listing?.id} currentUser={currentUser} />
            </div>
          </div>

          <div className="relative mx-auto max-w-[1200px] flex-1 overflow-y-auto">
            <div className="grid gap-4 p-4 lg:grid-cols-2">
              {listing.images.map((image) => (
                <Image
                  className="h-auto w-full rounded-lg"
                  src={image}
                  alt=""
                  width={1200}
                  height={800}
                  style={{ objectFit: "cover", aspectRatio: "4 / 3" }}
                />
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
