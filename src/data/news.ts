export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const newsData: News[] = [
  {
    date: "08/25",
    title: "",
    description: "I am at Princeton attending the Machine Learning Theory Summer School.",
  },
  {
    date: "07/25",
    title: "",
    description: "I am at ICML, presenting our work on reward hacking at the Models of Human Feedback for AI Alignment Workshop.",
  },
  {
    date: "06/25",
    title: "",
    description: "I am at University of Minnesota attending the North America School of Information Theory.",
  },
  {
    date: "05/25",
    title: "",
    description: "I just finished my first year of PhD at Harvard!",
  },
  {
    date: "04/25",
    title: "",
    description: "Our paper on discretion in AI alignment was accepted to FAccT 2025!",
  },
];
