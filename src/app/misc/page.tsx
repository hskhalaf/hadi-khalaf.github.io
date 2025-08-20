import { Navigation } from "@/components/navigation";

export default function MiscPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-[#FFFCF8]">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
            Miscellaneous
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            A collection of various thoughts, resources, and interesting things I&apos;ve come across.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder content - you can customize this */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-zinc-200 transition-all duration-300">
            <h3 className="text-lg font-semibold text-zinc-900 mb-3">Interesting Papers</h3>
            <p className="text-zinc-600 leading-relaxed">
              A curated list of research papers that caught my attention.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-zinc-200 transition-all duration-300">
            <h3 className="text-lg font-semibold text-zinc-900 mb-3">Tools & Resources</h3>
            <p className="text-zinc-600 leading-relaxed">
              Useful tools and resources I&apos;ve found helpful in my work.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-zinc-200 transition-all duration-300">
            <h3 className="text-lg font-semibold text-zinc-900 mb-3">Random Thoughts</h3>
            <p className="text-zinc-600 leading-relaxed">
              Various ideas and thoughts that don&apos;t fit elsewhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
