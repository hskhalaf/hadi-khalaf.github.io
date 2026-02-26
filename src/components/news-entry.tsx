"use client";

import { News } from "@/data/news";
import { Confetti } from "./confetti";
import { useState, useRef, useEffect } from "react";

export function NewsEntry({ news }: { news: News }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (!descriptionElement) return;

    const handleMouseOver = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('best-paper-award')) {
        setShowConfetti(true);
      }
    };

    const handleMouseOut = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('best-paper-award')) {
        setShowConfetti(false);
      }
    };

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            const offset = 80; // Account for navigation bar height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
            
            // Pop out specific publication
            if (href === '#research-title') {
              setTimeout(() => {
                let publicationId = '';
                if (target.textContent?.includes('discretion')) {
                  publicationId = 'discretion-paper';
                } else if (target.textContent?.includes('reward') || target.textContent?.includes('hacking')) {
                  publicationId = 'reward-hacking-paper';
                }
                if (publicationId) {
                  const publicationElement = document.getElementById(publicationId);
                  if (publicationElement) {
                    publicationElement.style.transition = 'box-shadow 0.1s ease-out';
                    publicationElement.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)';
                    setTimeout(() => {
                      publicationElement.style.boxShadow = '';
                    }, 500);
                  }
                }
              }, 0);
            }
          }
        }
      }
    };

    descriptionElement.addEventListener('mouseover', handleMouseOver);
    descriptionElement.addEventListener('mouseout', handleMouseOut);
    descriptionElement.addEventListener('click', handleClick);

    return () => {
      descriptionElement.removeEventListener('mouseover', handleMouseOver);
      descriptionElement.removeEventListener('mouseout', handleMouseOut);
      descriptionElement.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col flex-1">
          <div className="flex items-start gap-4">
            <p className="text-sm text-zinc-500 mt-1 shrink-0">{news.date}</p>
            <p 
              ref={descriptionRef}
              className="text-[15px] text-black leading-relaxed [&_a]:underline [&_a]:text-zinc-700 [&_a:hover]:text-black"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          </div>
        </div>
      </div>
      <Confetti isActive={showConfetti} />
    </>
  );
}
