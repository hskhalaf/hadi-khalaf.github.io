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
import Link from "next/link";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-16">
        {/* Two Column Layout for About */}
        <div className="space-y-12">
          {aboutMe.description && (
            <section className="mb-12" id="about">
              <div className="flex flex-col lg:flex-row lg:gap-6">
                {/* Main content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <h2 className="text-xl font-semibold text-black whitespace-nowrap">About Me</h2>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                      <a
                        href={aboutMe.googleScholarUrl}
                        className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        google scholar
                      </a>
                      <a
                        href={`https://github.com/${aboutMe.githubUsername}`}
                        className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github
                      </a>
                      <a
                        href={`https://twitter.com/${aboutMe.twitterUsername}`}
                        className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        twitter
                      </a>
                      <a
                        href="https://open.spotify.com/playlist/2CbIKXWXTnLLCTno6X8LSz?si=af37cff7fe154bef"
                        className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        spotify
                      </a>
                    </div>
                  </div>
                  <p
                    className="text-base leading-relaxed text-black [&_a]:underline [&_a]:text-black [&_a:hover]:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                  />
                  <p className="mt-3 text-base text-black">
                    I am always happy to chat about research, if/how AI is going to kill us all, PhD admissions, and ice cream on hadikhalaf [at] g dot harvard dot edu.
                  </p>
                </div>
                {/* Sidebar with profile info */}
                <div className="lg:w-80 lg:flex-shrink-0 mt-3 lg:mt-0">
                  <ProfileSection aboutMe={aboutMe} />
                </div>
              </div>
            </section>
          )}

            {/* Map through sectionOrder to render sections in correct order */}
            {sectionOrder.map((sectionName) => {
              switch (sectionName) {
                case Section.News:
                  return (
                    newsData.length > 0 && (
                      <section key={sectionName} id="news-section">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
                          <h2 id="news-title" className="text-xl font-semibold text-black">
                            Selected News
                          </h2>
                          {newsData.filter(news => news.showOnHomepage).length < newsData.length && (
                            <Link 
                              href="/news" 
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200"
                            >
                              Show All
                            </Link>
                          )}
                        </div>
                        <div className="space-y-6">
                          {newsData
                            .filter(news => news.showOnHomepage)
                            .map((news, index) => (
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
                          Education
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
                      <section key={sectionName} id="research-section">
                        <h2 id="research-title" className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
                          Publications
                        </h2>

                        <div className="space-y-8">
                          {publicationData.map((publication, index) => {
                            // Hardcode specific IDs for each publication
                            let publicationId = '';
                            if (publication.title.includes('reward')) {
                              publicationId = 'reward-hacking-paper';
                            } else if (publication.title.includes('Discretion')) {
                              publicationId = 'discretion-paper';
                            } else {
                              publicationId = `publication-${index}`;
                            }
                            
                            return (
                              <div key={index}>
                                <PublicationEntry 
                                  publication={publication} 
                                  id={publicationId}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    )
                  );
                case Section.Experience:
                  return (
                    experienceData.length > 0 && (
                      <section key={sectionName}>
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
                          Experience
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
                          Portfolio
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-gray-300 pb-2">
                          Questions I&apos;m Thinking About
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
  );
}