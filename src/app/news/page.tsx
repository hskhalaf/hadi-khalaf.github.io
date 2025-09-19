import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { Navigation } from "@/components/navigation";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-[#FFFCF8]">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">All News</h1>
          <p className="text-zinc-600">Complete timeline of recent updates and announcements.</p>
        </div>

        <div className="space-y-6">
          {newsData.map((news, index) => (
            <div key={index}>
              <NewsEntry news={news} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-200"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
