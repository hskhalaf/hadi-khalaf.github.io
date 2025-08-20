"use client";

import { AboutMe } from "@/data/aboutme";

interface NavigationButtonsProps {
  aboutMe: AboutMe;
}

export function NavigationButtons({ aboutMe }: NavigationButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={() => document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 text-sm font-medium"
      >
        📰 News
      </button>
      <button
        onClick={() => document.getElementById('research-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="inline-flex items-center px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 rounded-lg border border-green-200 hover:border-green-300 transition-all duration-200 text-sm font-medium"
      >
        🔬 Research
      </button>
      {aboutMe.cvUrl && (
        <button
          onClick={() => window.open(aboutMe.cvUrl, '_blank')}
          className="inline-flex items-center px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 rounded-lg border border-purple-200 hover:border-purple-300 transition-all duration-200 text-sm font-medium"
        >
          📄 CV
        </button>
      )}
    </div>
  );
}
