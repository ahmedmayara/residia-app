import { Poppins } from "next/font/google";

import "./globals.css";

import { DialogProvider } from "@/providers/dialog-provider";
import { getCurrentUser } from "@/server/get-current-user";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import { constructMetadata } from "@/lib/utils";

import { Navbar } from "@/components/marketing/navbar";
import { MobileNavigation } from "@/components/mobile-navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar currentUser={currentUser} />
        <Toaster position="bottom-center" richColors />
        <DialogProvider />
        <div className="pb-20 pt-[7.5rem] lg:pt-[6.3rem]">{children}</div>
        <MobileNavigation currentUser={currentUser} />
        <SpeedInsights />
      </body>
    </html>
  );
}
