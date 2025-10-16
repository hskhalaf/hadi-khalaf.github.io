export interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
  showOnHomepage?: boolean;
  categories?: ("publication" | "travel" | "milestone" | "research" | "award" | "talk")[];
}

export const newsData: News[] = [
  {
    date: "09/25",
    title: "",
    description: "Extremely happy to share that our work on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> in large language models was accepted to NeurIPS 2025 as a <strong>Spotlight Paper</strong>! I am also thankful for the NeurIPS Scholar Award.",
    showOnHomepage: true,
    categories: ["publication", "award", "milestone", "research"]
  },
  {
    date: "09/25",
    title: "",
    description: "Just started my second year of PhD!",
    showOnHomepage: false,
    categories: ["milestone"]
  },
  {
    date: "09/25",
    title: "",
    description: "I am at Amazon NYC presenting <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> at the NY Reinforcement Learning Workshop.",
    showOnHomepage: false,
    categories: ["research", "travel"]
  },
  {
    date: "08/25",
    title: "",
    description: "I am at Princeton attending the Machine Learning Theory Summer School.",
    showOnHomepage: false,
    categories: ["travel"]
  },
  {
    date: "07/25",
    title: "",
    description: "I am at ICML, presenting our work on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> at the Models of Human Feedback for AI Alignment Workshop. Grateful to have been awarded the Hudson River Trading travel grant.",
    showOnHomepage: true,
    categories: ["research", "travel"]
  },
  {
    date: "06/25",
    title: "",
    description: "I am at University of Minnesota attending the North America School of Information Theory.",
    showOnHomepage: false,
    categories: ["travel"]
  },
  {
    date: "05/25",
    title: "",
    description: "I just finished my first year of PhD at Harvard!",
    showOnHomepage: false,
    categories: ["milestone"]
  },
  {
    date: "04/25",
    title: "",
    description: "Our paper on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>discretion<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> in AI alignment was accepted to ACM FAccT 2025!",
    showOnHomepage: true,
    categories: ["publication", "research"]
  },
  {
    date: "03/25",
    title: "",
    description: "I am at Yale, giving a talk on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>discretion<span style='font-size: 0.7em; vertical-align: top; margin-left: 2px; opacity: 0.6;'>🔍</span></a> in AI alignment. Happy to share that this work got the <span class='best-paper-award' style='cursor: pointer; font-weight: bold;'>Best Paper Award</span> at the New England NLP workshop! You can check my slides <a href='/AI Alignment at your Discretion - 04 11 25.pdf' target='_blank' rel='noopener noreferrer' style='text-decoration: none; color: #2563eb;'>here</a>.",
    showOnHomepage: true,
    categories: ["award", "research", "travel"]
  },
  {
    date: "09/24",
    title: "",
    description: "I joined Harvard as a PhD student in Flavio Calmon's group! Happy to be supported by the Harvard Graduate Prize Fellowship.",
    showOnHomepage: true,
    categories: ["award", "milestone"]
  },
];
