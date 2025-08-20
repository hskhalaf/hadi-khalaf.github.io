"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import { AboutMe } from "@/data/aboutme";

interface ProfileSectionProps {
  aboutMe: AboutMe;
}

export function ProfileSection({ aboutMe }: ProfileSectionProps) {
  if (!aboutMe) {
    return null;
  }

  return (
    <div className="lg:sticky top-12 flex flex-col gap-4 space-y-4 lg:space-y-6">
      {aboutMe.imageUrl && (
        <div className="flex justify-start">
          <div className="relative w-36 h-44 lg:w-full lg:max-w-[240px] aspect-[3/4]">
            <Image
              src={aboutMe.imageUrl}
              alt={aboutMe.name}
              fill
              priority
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      )}
      <div className="text-left">
        <div className="mb-2">
          <h1 className="font-sans text-2xl lg:text-3xl font-medium tracking-wide">
            {aboutMe.name}
          </h1>
        </div>
        {aboutMe.altName && (
          <p className="text-zinc-600 text-lg leading-relaxed tracking-wide mb-3">
            {aboutMe.altName}
          </p>
        )}
        <div className="flex flex-col gap-2 lg:gap-3 mb-3">
          {aboutMe.blogUrl && (
            <button
              onClick={() => window.open(aboutMe.blogUrl, '_blank')}
              className="group inline-flex items-center gap-2 text-xs lg:text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-300 bg-transparent border-none cursor-pointer justify-start"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Blog</span>
            </button>
          )}
        </div>
        <div className="space-y-2 lg:space-y-3 text-left">
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <Mail size={14} />
            <span className="break-all">hadikhalaf at g dot harvard dot edu</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <GraduationCap size={14} />
            <a
              href={aboutMe.googleScholarUrl}
              className="hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <Twitter size={14} />
            <a
              href={`https://twitter.com/${aboutMe.twitterUsername}`}
              className="hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{aboutMe.twitterUsername}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <Github size={14} />
            <a
              href={`https://github.com/${aboutMe.githubUsername}`}
              className="hover:text-blue-600 transition-colors break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/{aboutMe.githubUsername}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <Linkedin size={14} />
            <a
              href={`https://www.linkedin.com/in/${aboutMe.linkedinUsername}`}
              className="hover:text-blue-600 transition-colors break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/{aboutMe.linkedinUsername}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <span className="text-green-500 text-xs">🎵</span>
            <a
              href="https://open.spotify.com/playlist/2CbIKXWXTnLLCTno6X8LSz?si=af37cff7fe154bef"
              className="hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Spotify Playlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}