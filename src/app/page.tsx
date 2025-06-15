import { EducationEntry } from "@/components/education-entry";
import { educationData } from "@/data/education";
import { PublicationEntry } from "@/components/publication-entry";
import { publicationData } from "@/data/publication";
import { ProfileSection } from "@/components/profile-section";
import { aboutMe } from "@/data/aboutme";
import { NewsEntry } from "@/components/news-entry";
import { newsData } from "@/data/news";
import { ExperienceEntry } from "@/components/experience-entry";
import { experienceData } from "@/data/experience";
import { PortfolioEntry } from "@/components/portfolio-entry";
import { portfolioData } from "@/data/portfolio";
import { sectionOrder, Section } from "@/data/section-order";
import { QuestionsEntry } from "@/components/questions-entry";
import { questionsData } from "@/data/questions";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-[#FFFCF8]">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-24">
        {/* Grid Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Sidebar (full width on mobile, fixed width on desktop) */}
          <div className="w-full lg:col-span-4 space-y-8 lg:space-y-12">
            <div className="lg:sticky top-12 space-y-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-zinc-100/50">
                <ProfileSection aboutMe={aboutMe} />
              </div>
            </div>
          </div>

          {/* Right Column - Content (full width on mobile, 75% on desktop) */}
          <div className="w-full lg:col-span-7 space-y-16 lg:space-y-20 lg:max-w-none">
            {/* About section */}
            {aboutMe.description && (
              <section>
                <p
                  className="font-serif text-lg leading-relaxed text-zinc-700 [&_a]:underline [&_a]:text-zinc-900 [&_a:hover]:text-zinc-600"
                  dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                />
              </section>
            )}

            {/* Map through sectionOrder to render sections in correct order */}
            {sectionOrder.map((sectionName) => {
              switch (sectionName) {
                case Section.News:
                  return (
                    newsData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase mb-12 relative">
                          <span className="bg-gradient-to-br from-zinc-50 to-[#FFFCF8] pr-4">News</span>
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-zinc-200 to-transparent -z-10"></div>
                        </h2>
                        <div className="space-y-12">
                          {newsData.map((news, index) => (
                            <div key={index}>
                              <NewsEntry news={news} />
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Education:
                  return (
                    educationData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase mb-12 relative">
                          <span className="bg-gradient-to-br from-zinc-50 to-[#FFFCF8] pr-4">Education</span>
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-zinc-200 to-transparent -z-10"></div>
                        </h2>
                        <div className="space-y-12">
                          {educationData.map((education, index) => (
                            <EducationEntry key={index} education={education} />
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Publication:
                  return (
                    publicationData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase mb-12 relative">
                          <span className="bg-gradient-to-br from-zinc-50 to-[#FFFCF8] pr-4">Publications</span>
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-zinc-200 to-transparent -z-10"></div>
                        </h2>
                        
                        {/* Special attention-grabbing element for publications */}
                        <div className="mb-12 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100/50 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
                          <div className="relative">
                            <h3 className="font-serif text-xl text-blue-900 mb-2">Recent Research</h3>
                            <p className="text-blue-800/80 leading-relaxed">
                             Always happy to chat about research or potential collaborations! 
                              <span className="font-medium"> Check out my recent work below .</span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-8">
                          {publicationData.map((publication, index) => (
                            <div key={index}>
                              <PublicationEntry publication={publication} />
                            </div>
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Experience:
                  return (
                    experienceData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase mb-12 relative">
                          <span className="bg-gradient-to-br from-zinc-50 to-[#FFFCF8] pr-4">Experience</span>
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-zinc-200 to-transparent -z-10"></div>
                        </h2>
                        <div className="space-y-12">
                          {experienceData.map((experience, index) => (
                            <ExperienceEntry
                              key={index}
                              experience={experience}
                            />
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Portfolio:
                  return (
                    portfolioData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase mb-12 relative">
                          <span className="bg-gradient-to-br from-zinc-50 to-[#FFFCF8] pr-4">Portfolio</span>
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-zinc-200 to-transparent -z-10"></div>
                        </h2>
                        <div className="space-y-12">
                          {portfolioData.map((portfolio, index) => (
                            <PortfolioEntry key={index} portfolio={portfolio} />
                          ))}
                        </div>
                      </section>
                    )
                  );
                case Section.Questions:
                  return (
                    questionsData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-400 uppercase mb-12 relative">
                          <span className="bg-gradient-to-br from-zinc-50 to-[#FFFCF8] pr-4">Questions I&apos;m Thinking About</span>
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-zinc-200 to-transparent -z-10"></div>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {questionsData.map((question, index) => (
                            <QuestionsEntry key={index} question={question} />
                          ))}
                        </div>
                      </section>
                    )
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}