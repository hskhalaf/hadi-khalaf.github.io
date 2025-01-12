export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export const educationData: Education[] = [
  // If you don't want to show education, just make the array empty.
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
    advisor: "Prof. Ibrahim Abou Faycal",
    // thesis: "Algorithmic Approaches to Causal Discovery",
    // Optional links to thesis
    // thesisUrl: "https://dspace.mit.edu/handle/1721.1/149111"
  },
];
