import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8">
      <div className="mt-3 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-1/2" />
          <Skeleton className="h-5 w-1/5" />
        </div>

        <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="col-span-2">
            <Skeleton
              className="h-full rounded-lg sm:w-full"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
          <div className="col-span-1 space-y-3">
            <Skeleton
              className="h-1/2 rounded-lg sm:w-full"
              style={{ aspectRatio: "4 / 3" }}
            />
            <Skeleton
              className="h-1/2 rounded-lg sm:w-full"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
          <div className="col-span-1 space-y-3">
            <Skeleton
              className="h-1/2 rounded-lg sm:w-full"
              style={{ aspectRatio: "4 / 3" }}
            />
            <Skeleton
              className="h-1/2 rounded-lg sm:w-full"
              style={{ aspectRatio: "4 / 3" }}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 text-lg font-medium">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div className="flex flex-row items-center gap-4 font-light text-muted-foreground">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-1/6" />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-row items-center gap-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/6" />
              </div>
              <Skeleton className="h-60 w-full rounded-lg" />
            </div>

            <div className="mt-6">
              <Skeleton className="h-[50vh] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
