"use client";

import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

export function ProjectEntry({
  project,
  id,
}: {
  project: Project;
  id?: string;
}) {
  return (
    <div 
      id={id}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-zinc-100 hover:border-zinc-200"
    >
      <div className="flex flex-col">
        <div className="mb-3">
          <h3 className="font-bold text-lg md:text-xl leading-relaxed inline">
            {project.title}
            {project.linkUrl && (
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 ml-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
              >
                <ArrowUpRight
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
                <span className="tracking-wider uppercase font-normal">Link</span>
              </a>
            )}
          </h3>
        </div>
        
        <div className="mb-4">
          <p className="text-base text-black mb-1">
            <span className="font-bold text-black">TLDR&nbsp;&nbsp;</span> {project.tldr}
          </p>
        </div>
      </div>
    </div>
  );
}
