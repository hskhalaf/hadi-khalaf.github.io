"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Publication } from "@/data/publication";

export function PublicationEntry({
  publication,
  id,
  isHighlighted = false,
}: {
  publication: Publication;
  id?: string;
  isHighlighted?: boolean;
}) {
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);

  return (
    <div 
      id={id}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-zinc-100 hover:border-zinc-200"
    >
      <div className="flex flex-col sm:flex-row gap-6">
      {publication.imageUrl && (
        <div className="w-full sm:w-1/4 min-w-[160px] relative">
          <Image
            src={publication.imageUrl}
            alt={publication.title}
            width={160}
            height={200}
            className="rounded-lg transition-all duration-300"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center sm:justify-between mb-1">
          <p className="text-xs text-zinc-500">
            {publication.conference} {publication.year}
          </p>
          {publication.award && (
            <div className="flex px-2 py-1 bg-gradient-to-r from-amber-50 to-rose-50 rounded-md items-center shadow-md border border-amber-100/50 max-w-[180px] sm:ml-auto hover:rotate-1 transition-transform duration-200">
              <p className="text-xs text-amber-700 font-medium">
                {publication.award}
              </p>
            </div>
          )}
        </div>
        <h3 className="font-bold text-lg md:text-xl mb-3 leading-relaxed">{publication.title}</h3>
        <p 
          className="text-base text-zinc-600 mb-4"
          dangerouslySetInnerHTML={{ __html: publication.authors }}
        />
        
        {publication.tldr && (
          <div className="mb-2">
            <p className="text-base text-zinc-600 mb-2">
              <span className="font-bold text-zinc-700">TLDR&nbsp;&nbsp;</span> {publication.tldr}
            </p>
          </div>
        )}

        {publication.abstract && (
          <div className="mb-1">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
                className="flex items-center gap-2 text-base text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
              >
                <span className="font-medium">Abstract</span>
                {isAbstractExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              
              {publication.paperUrl && (
                <a
                  href={publication.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                >
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                  <span className="tracking-wider uppercase">Paper</span>
                </a>
              )}
              {publication.codeUrl && (
                <a
                  href={publication.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                >
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                  <span className="tracking-wider uppercase">Code</span>
                </a>
              )}
              {publication.blogUrl && (
                <a
                  href={publication.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
                >
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                  <span className="tracking-wider uppercase">Blog Post</span>
                </a>
              )}
            </div>
            
            {isAbstractExpanded && (
              <div className="mt-2 p-3 bg-blue-50/80 rounded-md border-l-2 border-blue-200">
                <p className="text-base text-zinc-700 leading-relaxed">
                  {publication.abstract}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-row gap-6">
          {publication.bibtex && (
            <a
              href={publication.bibtex}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
              <span className="tracking-wider uppercase">BibTeX</span>
            </a>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}