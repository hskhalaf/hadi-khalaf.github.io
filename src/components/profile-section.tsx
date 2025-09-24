"use client";

import Image from "next/image";
import { AboutMe } from "@/data/aboutme";

interface ProfileSectionProps {
  aboutMe: AboutMe;
}

export function ProfileSection({ aboutMe }: ProfileSectionProps) {
  if (!aboutMe) {
    return null;
  }

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      {aboutMe.imageUrl && (
        <div className="hidden lg:block relative w-44 h-64 sm:w-56 sm:h-72 rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
          <Image
            src={aboutMe.imageUrl}
            alt={aboutMe.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
      {/* Name moved to About Me header */}
    </div>
  );
}