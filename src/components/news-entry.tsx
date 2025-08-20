import { News } from "@/data/news";

export function NewsEntry({ news }: { news: News }) {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col flex-1">
        <div className="flex items-start gap-4">
          <p className="text-sm text-zinc-500 mt-1">{news.date}</p>
          <p className="text-base text-zinc-600 leading-relaxed">{news.description}</p>
        </div>
      </div>
    </div>
  );
}
