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
        <div className="flex justify-center lg:justify-start">
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
      <div className="text-center lg:text-left">
        <div className="flex items-baseline gap-8 mb-2">
          <h1 className="font-sans text-2xl lg:text-3xl font-medium tracking-wide">
            {aboutMe.name}
          </h1>
          {aboutMe.cvUrl && (
            <button
              onClick={() => window.open(aboutMe.cvUrl, '_blank')}
              className="group inline-flex items-center gap-1 text-xs lg:text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">CV</span>
            </button>
          )}
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
              className="group inline-flex items-center gap-2 text-xs lg:text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-300 bg-transparent border-none cursor-pointer justify-center lg:justify-start"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Blog</span>
            </button>
          )}
        </div>
        <div className="space-y-2 lg:space-y-3 text-center lg:text-left">
          <a
            href={`mailto:${aboutMe.email}`}
            className="inline-flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-zinc-600 hover:text-zinc-900 transition-colors justify-center lg:justify-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={12} className="lg:hidden" />
            <Mail size={14} className="hidden lg:block" />
            <span className="break-all text-xs lg:text-sm">{aboutMe.email}</span>
          </a>
          {aboutMe.googleScholarUrl && (
            <div>
              <a
                href={aboutMe.googleScholarUrl}
                className="inline-flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900 transition-colors justify-center md:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GraduationCap size={14} />
                Google Scholar
              </a>
            </div>
          )}
          {aboutMe.twitterUsername && (
            <div>
              <a
                href={`https://twitter.com/${aboutMe.twitterUsername}`}
                className="inline-flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900 transition-colors justify-center md:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={14} />@{aboutMe.twitterUsername}
              </a>
            </div>
          )}
          {aboutMe.githubUsername && (
            <div>
              <a
                href={`https://github.com/${aboutMe.githubUsername}`}
                className="inline-flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900 transition-colors justify-center md:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                <span className="break-all">github.com/{aboutMe.githubUsername}</span>
              </a>
            </div>
          )}
          {aboutMe.linkedinUsername && (
            <div>
              <a
                href={`https://www.linkedin.com/in/${aboutMe.linkedinUsername}`}
                className="inline-flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900 transition-colors justify-center md:justify-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={14} />
                <span className="break-all">linkedin.com/in/{aboutMe.linkedinUsername}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}