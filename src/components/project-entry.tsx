"use client";

import { Project } from "@/data/projects";

export function ProjectEntry({
  project,
  id,
}: {
  project: Project;
  id?: string;
}) {
  return (
    <div id={id} className="mb-8">
      <div className="flex flex-wrap items-baseline gap-2 mb-1">
        <h3 className="font-semibold text-[17px] leading-snug text-black">
          {project.title}
        </h3>
        {project.linkUrl && (
          <a
            href={project.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-zinc-600 hover:text-black transition-colors"
          >
            [link]
          </a>
        )}
      </div>
      <p className="text-[15px] leading-relaxed mt-1.5 mb-2 ml-2 pl-3 pr-4 py-1.5 border-l-2 border-zinc-500 bg-zinc-200/40 max-w-full whitespace-nowrap overflow-x-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">TLDR</span>
        <span className="font-medium text-zinc-800 pl-3">{project.tldr}</span>
      </p>
    </div>
  );
}
