export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export const educationData: Education[] = [
  {
    year: "2024—Present",
    institution: "Harvard University",
    degree: "Ph.D. in Computer Science",
    advisor: "Prof. Flavio Calmon",
  },
  {
    year: "2020—2024",
    institution: "American University of Beirut",
    degree: "B.S. in Statistics and B.E. in Computer Engineering",
  },
];
