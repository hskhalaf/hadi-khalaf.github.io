import { EducationEntry } from "@/components/education-entry";
import { educationData } from "@/data/education";
import { PublicationEntry } from "@/components/publication-entry";
import { publicationData } from "@/data/publication";
import { ProjectEntry } from "@/components/project-entry";
import { projectData } from "@/data/projects";
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
import { Fragment } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[900px] mx-auto px-6 pt-6 pb-12">
        <div className="space-y-12">
          {aboutMe.description && (
            <section className="mb-12" id="about">
              <div className="overflow-auto">
                <div className="float-right ml-6 mb-4 mt-10 shrink-0">
                  <ProfileSection aboutMe={aboutMe} />
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <h1 className="text-4xl font-semibold text-black">{aboutMe.name}</h1>
                  <p className="text-sm text-zinc-600">
                    {aboutMe.googleScholarUrl && (
                      <>
                        <a href={aboutMe.googleScholarUrl} className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">Google Scholar</a>
                        {" · "}
                      </>
                    )}
                    {aboutMe.githubUsername && (
                      <>
                        <a href={`https://github.com/${aboutMe.githubUsername}`} className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">Github</a>
                        {" · "}
                      </>
                    )}
                    {aboutMe.twitterUsername && (
                      <>
                        <a href={`https://twitter.com/${aboutMe.twitterUsername}`} className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
                        {" · "}
                      </>
                    )}
                    <a href="https://open.spotify.com/playlist/2CbIKXWXTnLLCTno6X8LSz?si=af37cff7fe154bef" className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">Spotify Playlist</a>
                    {aboutMe.cvUrl && (
                      <>
                        {" · "}
                        <a href={aboutMe.cvUrl} className="hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">CV</a>
                      </>
                    )}
                  </p>
                </div>
                <p
                  className="text-[17px] leading-relaxed text-black [&_a]:underline [&_a]:text-black [&_a:hover]:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: aboutMe.description }}
                />
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
                        <div className="flex items-center justify-between mb-4 border-b border-zinc-200 pb-2">
                          <h2 id="news-title" className="text-xl font-semibold text-black">
                            Selected News
                          </h2>
                          {newsData.filter(news => news.showOnHomepage).length < newsData.length && (
                            <Link 
                              href="/news" 
                              className="text-sm text-zinc-600 hover:text-black transition-colors"
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
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
                      <Fragment key={sectionName}>
                        {publicationData.filter((p) => p.isPreprint).length > 0 && (
                          <section key="preprints" id="preprints-section">
                            <h2 className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
                              Preprints
                            </h2>
                            <div className="space-y-8">
                              {publicationData
                                .filter((p) => p.isPreprint)
                                .map((publication, index) => (
                                  <div key={index}>
                                    <PublicationEntry
                                      publication={publication}
                                      id={publication.title.includes("Lotteries") ? "lotteries-paper" : `preprint-${index}`}
                                      hideVenue
                                    />
                                  </div>
                                ))}
                            </div>
                          </section>
                        )}
                        {publicationData.filter((p) => !p.isPreprint).length > 0 && (
                          <section key={sectionName} id="research-section">
                            <h2 id="research-title" className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
                              Publications
                            </h2>
                            <div className="space-y-8">
                              {publicationData
                                .filter((p) => !p.isPreprint)
                                .map((publication, index) => {
                                  let publicationId = "";
                                  if (publication.title.includes("reward")) publicationId = "reward-hacking-paper";
                                  else if (publication.title.includes("Discretion")) publicationId = "discretion-paper";
                                  else publicationId = `publication-${index}`;
                                  return (
                                    <div key={index}>
                                      <PublicationEntry publication={publication} id={publicationId} />
                                    </div>
                                  );
                                })}
                            </div>
                            <p className="text-sm text-zinc-500 mt-4">* indicates equal contribution</p>
                          </section>
                        )}
                      </Fragment>
                    )
                  );
                case Section.Projects:
                  return (
                    projectData.length > 0 && (
                      <section key={sectionName} id="projects-section">
                        <h2 id="projects-title" className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
                          Projects
                        </h2>

                        <div className="space-y-8">
                          {projectData.map((project, index) => (
                            <div key={index}>
                              <ProjectEntry 
                                project={project} 
                                id={`project-${index}`}
                              />
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
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
                        <h2 className="text-xl font-semibold mb-4 text-black border-b border-zinc-200 pb-2">
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