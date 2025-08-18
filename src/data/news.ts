export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const newsData: News[] = [
  {
    date: "08/11/25",
    title: "",
    description: "I am at Princeton attending the Machine Learning Theory Summer School!",
  },
  {
    date: "07/12/25",
    title: "",
    description: "I am at ICML, presenting my work on reward hacking at the Models of Human Feedback for AI Alignment Workshop!",
  },
  {
    date: "06/16/25",
    title: "",
    description: "I am at University of Minnesota attending the North America School of Information Theory!",
  },
];
