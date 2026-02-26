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
    <div>
      {aboutMe.imageUrl && (
        <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded overflow-hidden border border-zinc-200">
          <Image
            src={aboutMe.imageUrl}
            alt={aboutMe.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}