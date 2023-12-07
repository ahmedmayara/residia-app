import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Residia - Where Every Journey Finds Its Home.",
  description = "Discover Your Perfect Stay : Residia - Where Every Journey Finds Its Home.",
  image = "/images/og.png",
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
          url: image,
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
    metadataBase: new URL("https://residia-app.vercel.app"),
    themeColor: "#ffffff",
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
