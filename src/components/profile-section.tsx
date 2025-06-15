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
    <div className="md:sticky top-12 flex flex-col gap-4 space-y-6">
      {aboutMe.imageUrl && (
        <div className="flex justify-center md:justify-start">
          <div className="relative w-48 h-60 md:w-full md:max-w-[200px] aspect-[3/4]">
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
      <div className="text-center md:text-left">
        <h1 className="font-sans text-xl font-medium tracking-wide mb-4">
          {aboutMe.name}
        </h1>
        {aboutMe.altName && (
          <p className="text-zinc-600 text-lg leading-relaxed tracking-wide mb-6">
            {aboutMe.altName}
          </p>
        )}
        <div className="flex flex-col gap-3 mb-6">
          {aboutMe.blogUrl && (
            <button
              onClick={() => window.open(aboutMe.blogUrl, '_blank')}
              className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-300 bg-transparent border-none cursor-pointer justify-center md:justify-start"
            >
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">Blog</span>
            </button>
          )}
          {aboutMe.cvUrl && (
            <button
              onClick={() => window.open(aboutMe.cvUrl, '_blank')}
              className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-300 bg-transparent border-none cursor-pointer justify-center md:justify-start"
            >
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">CV</span>
            </button>
          )}
        </div>
        <div className="space-y-3 text-center md:text-left">
          <a
            href={`mailto:${aboutMe.email}`}
            className="inline-flex items-center gap-3 text-sm text-zinc-600 hover:text-zinc-900 transition-colors justify-center md:justify-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={14} />
            <span className="break-all">{aboutMe.email}</span>
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