import { Navigation } from "@/components/navigation";
import { miscData } from "@/data/misc";

export default function MiscPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-[#FFFCF8]">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
            {miscData.pageTitle}
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            {miscData.pageDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {miscData.sections.map((section, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-zinc-200 transition-all duration-300">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">{section.title}</h3>
              <p className="text-zinc-600 leading-relaxed mb-4">
                {section.description}
              </p>
              {section.items && section.items.length > 0 && (
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-zinc-600" dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
