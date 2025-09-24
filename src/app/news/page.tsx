"use client";

import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

type BaseCategory = "publication" | "travel" | "milestone" | "research" | "award";
type NewsCategory = BaseCategory | "all";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>("all");
  
  const categories: { value: NewsCategory; label: string }[] = [
    { value: "all", label: "All" },
    { value: "publication", label: "New Publication" },
    { value: "travel", label: "Travel" },
    { value: "milestone", label: "Milestone" },
    { value: "research", label: "Research" },
    { value: "award", label: "Award" }
  ];

  const filteredNews = selectedCategory === "all" 
    ? newsData 
    : newsData.filter(news => news.categories && news.categories.includes(selectedCategory as BaseCategory));

  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          // Redirect to home page with the hash
          window.location.href = `/${href}`;
        }
      }
    };

    // Add event listener to handle internal navigation
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">All News</h1>
          <p className="text-gray-600 mb-6">Complete timeline of recent updates and announcements.</p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  selectedCategory === category.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredNews.map((news, index) => (
            <div key={index}>
              <NewsEntry news={news} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
