"use client";

import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";

import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  endpoint: "imageUploader";
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export function ImageUploader({
  endpoint,
  values,
  onValuesChange,
}: ImageUploaderProps) {
  const fileType = values?.[0]?.split(".").pop();

  if (values && fileType && ["jpg", "jpeg", "png"].includes(fileType)) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {values.map((value, index) => (
          <div className="relative h-[20vh] w-full rounded-lg" key={index}>
            <Image
              fill
              src={value}
              alt="Profile Image"
              className="h-[20vh] w-full rounded-lg"
              layout="fill"
              objectFit="cover"
            />
            <button
              onClick={() => {
                onValuesChange(values.filter((v) => v !== value));
              }}
              className="absolute right-2 top-2 rounded-full bg-primary p-1 text-white shadow-sm"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onValuesChange([...values, ...res.map((r) => r.url)]);
      }}
      onUploadError={(err) => {
        console.error(err);
      }}
    ></UploadDropzone>
  );
}
