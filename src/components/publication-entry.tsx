"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Publication } from "@/data/publication";

export function PublicationEntry({
  publication,
  id,
  hideVenue,
}: {
  publication: Publication;
  id?: string;
  hideVenue?: boolean;
}) {
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);

  const venueDisplay = publication.venueShort ?? `${publication.conference} ${publication.year}`;

  return (
    <div id={id} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {publication.imageUrl && (
          <div className="w-full sm:w-1/4 min-w-[140px] relative flex-shrink-0">
            <Image
              src={publication.imageUrl}
              alt={publication.title}
              width={140}
              height={180}
              className="rounded border border-zinc-200 object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <h3 className="font-semibold text-[17px] leading-snug text-black">
              {publication.title}
            </h3>
            {!hideVenue && venueDisplay && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded">
                {venueDisplay}
              </span>
            )}
            {publication.award && (
              <span className="inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-red-800 bg-red-50 border border-red-200/80 rounded">
                {publication.award}
              </span>
            )}
          </div>
          <p
            className="text-[15px] text-zinc-700 mb-0.5"
            dangerouslySetInnerHTML={{ __html: publication.authors }}
          />
          {publication.tldr && (
            <p className="text-[15px] leading-relaxed mt-1.5 mb-2 ml-2 pl-3 pr-4 py-1.5 border-l-2 border-zinc-500 bg-zinc-200/40 max-w-full whitespace-nowrap overflow-x-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">TLDR</span>
              <span className="font-medium text-zinc-800 pl-3">{publication.tldr}</span>
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm mt-2">
            {publication.abstract && (
              <button
                onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
                className="flex items-center gap-1 text-zinc-600 hover:text-black transition-colors"
              >
                {isAbstractExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                Abstract
              </button>
            )}
            <div className="flex flex-wrap gap-4 font-semibold">
              {publication.paperUrl && (
                <a
                  href={publication.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-black transition-colors"
                >
                  [arxiv]
                </a>
              )}
              {publication.codeUrl && (
                <a
                  href={publication.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-black transition-colors"
                >
                  [code]
                </a>
              )}
              {publication.blogUrl && (
                <a
                  href={publication.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-black transition-colors"
                >
                  [blog]
                </a>
              )}
              {publication.bibtex && (
                <a
                  href={publication.bibtex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 hover:text-black transition-colors"
                >
                  [bibtex]
                </a>
              )}
            </div>
          </div>
          {publication.abstract && isAbstractExpanded && (
            <p className="mt-2 text-[15px] text-zinc-700 leading-relaxed border-l-2 border-zinc-200 pl-3 py-2 pr-3 rounded-r shadow-sm bg-zinc-50/50">
              {publication.abstract}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
