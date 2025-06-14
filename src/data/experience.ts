export interface Experience {
  date: string;
  title: string;
  company: string;
  description?: string;
  advisor?: string;
  advisorUrl?: string; // Add this line
  manager?: string;
  companyUrl?: string;
}

export const experienceData: Experience[] = [
  {
    date: "Summer 2023",
    title: "Research Intern",
    company: "Economics Department at Harvard",
    description:
      "Developed tools for counterfactual estimation in binary games.",
    advisor: "Prof. Elie Tamer",
    advisorUrl: "https://tamer.scholars.harvard.edu/", // Add this line
  },
];