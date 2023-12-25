import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Residia - Where Every Journey Finds Its Home.",
  description = "Discover Your Perfect Stay : Residia - Where Every Journey Finds Its Home.",
  image = "https://residia.vercel.app/images/opengraph.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://residia.vercel.app/images/opengraph.png",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ahmeedmayara",
    },
    icons,
    metadataBase: new URL("https://residia.vercel.app"),
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
