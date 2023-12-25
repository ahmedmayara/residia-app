"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden cursor-pointer lg:block"
      src="/logo.svg"
      width={120}
      height={40}
      alt="logo"
    />
  );
}
