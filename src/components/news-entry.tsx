import { ArrowUpRight } from "lucide-react";
import { News } from "@/data/news";

export function NewsEntry({ news }: { news: News }) {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-4">
          <p className="text-xs text-zinc-500">{news.date}</p>
          <p className="text-sm text-zinc-600">{news.description}</p>
        </div>
      </div>
    </div>
  );
}
