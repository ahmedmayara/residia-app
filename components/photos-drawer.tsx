"use client";

import Image from "next/image";
import { Listing } from "@prisma/client";
import { ChevronLeftIcon, Grid3x3Icon, ShareIcon } from "lucide-react";
import { Drawer } from "vaul";

import { Button } from "@/components/ui/button";

interface PhotosDrawerProps {
  listing: Listing;
}

export function PhotosDrawer({ listing }: PhotosDrawerProps) {
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
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-[100] mt-24 flex h-[95%] flex-col rounded-t-[10px] border bg-background">
          <div className="flex items-center justify-between p-4">
            <Drawer.Close className="rounded-lg border-0 p-1 transition hover:bg-muted">
              <ChevronLeftIcon size={18} />
            </Drawer.Close>

            <div className="ml-[4rem] h-1.5 w-[100px] rounded-full bg-muted" />

            <Button size="sm" variant="ghost" className="gap-x-2">
              <ShareIcon className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          <div className="relative mx-auto max-w-[1200px] flex-1 overflow-y-auto">
            <div className="grid gap-4 p-4 lg:grid-cols-2">
              {listing.images.map((image) => (
                <Image
                  className="h-auto w-full rounded-lg"
                  src={image}
                  alt=""
                  width={1200}
                  key={image}
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
