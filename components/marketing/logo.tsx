"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export function Logo() {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      className="cursor-pointer"
      src="/logo.svg"
      width={120}
      height={40}
      alt="logo"
    />
  );
}
