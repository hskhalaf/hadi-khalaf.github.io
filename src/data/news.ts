export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
}

export const newsData: News[] = [
  {
    date: "09/25",
    title: "",
    description: "I am at Amazon NYC presenting <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> at the NY Reinforcement Learning Workshop.",
  },
  {
    date: "08/25",
    title: "",
    description: "I am at Princeton attending the Machine Learning Theory Summer School.",
  },
  {
    date: "07/25",
    title: "",
    description: "I am at ICML, presenting our work on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> at the Models of Human Feedback for AI Alignment Workshop.",
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
    description: "Our paper on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>discretion<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> in AI alignment was accepted to FAccT 2025!",
  },
  {
    date: "03/25",
    title: "",
    description: "I am at Yale, giving a talk on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>discretion<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> in AI alignment. Happy to share that this work got the <span class='best-paper-award' style='cursor: pointer;'>Best Paper Award</span> at the New England NLP workshop! You can check my slides <a href='/AI Alignment at your Discretion - 04 11 25.pdf' target='_blank' rel='noopener noreferrer' style='text-decoration: none; color: #2563eb;'>here</a>.",
  },
];
