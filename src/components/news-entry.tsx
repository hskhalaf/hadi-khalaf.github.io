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
                // Determine which publication to pop out based on the clicked text
                let publicationId = '';
                console.log('Clicked text content:', target.textContent);
                console.log('Text includes discretion?', target.textContent?.includes('discretion'));
                console.log('Text includes reward?', target.textContent?.includes('reward'));
                
                if (target.textContent?.includes('discretion')) {
                  publicationId = 'discretion-paper';
                } else if (target.textContent?.includes('reward') || target.textContent?.includes('hacking')) {
                  publicationId = 'reward-hacking-paper';
                }
                
                console.log('Selected publication ID:', publicationId);
                
                // Find and pop out the specific publication
                if (publicationId) {
                  const publicationElement = document.getElementById(publicationId);
                  
                  if (publicationElement) {
                    // Add subtle pop-out effect - completely clean
                    console.log('Applying pop-out effect to:', publicationId);
                    console.log('Element before effect:', publicationElement.style.transform);
                    
                    // More visible shadow effect
                    publicationElement.style.transition = 'box-shadow 0.1s ease-out';
                    publicationElement.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.25)'; // More visible shadow
                    
                    console.log('Element after effect:', publicationElement.style.boxShadow);
                    console.log('Element found:', publicationElement);
                    
                    // Remove effect after 500ms (longer to see it)
                    setTimeout(() => {
                      console.log('Removing pop-out effect from:', publicationId);
                      publicationElement.style.boxShadow = '';
                    }, 500);
                  }
                }
              }, 0); // No delay - immediate effect
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
            <p className="text-sm text-zinc-500 mt-1">{news.date}</p>
            <p 
              ref={descriptionRef}
              className="text-base text-zinc-600 leading-relaxed [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          </div>
        </div>
      </div>
      <Confetti isActive={showConfetti} />
    </>
  );
}
