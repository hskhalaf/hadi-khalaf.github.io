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
    date: "11/26",
    title: "",
    description: "New preprint on optimally combining decision models! See our paper <a href='https://arxiv.org/pdf/2610.30076' style='text-decoration: none; color: #2563eb;'>here</a> and its <a href='https://infotheorylab.github.io/LLM-circuits/' style='text-decoration: none; color: #2563eb;'>website</a>.",
    showOnHomepage: true,
    categories: ["publication", "research"]
  },
  {
    date: "6/26",
    title: "",
    description: "I was awarded the Kempner Institute Graduate Fellowship! This will support my remaining years at Harvard.",
    showOnHomepage: true,
    categories: ["award"]
  },
  {
    date: "5/26",
    title: "",
    description: "Our paper on <a href='https://arxiv.org/pdf/2602.21297' style='text-decoration: none; color: #2563eb;'>robust AI evaluation</a> was accepted to ICML! See you in Seoul :)",
    showOnHomepage: true,
    categories: ["publication"]
  },
  {
    date: "4/26",
    title: "",
    description: "I passed my quals! I'd love to thank Flavio Calmon, Boaz Barak, Ariel Procaccia, and Milind Tambe.",
    showOnHomepage: true,
    categories: ["milestone"]
  },
  {
    date: "2/26",
    title: "",
    description: "I will be interning at Microsoft this summer, working on agentic systems!",
    showOnHomepage: true,
    categories: ["milestone"]
  },
  {
    date: "2/26",
    title: "",
    description: "New preprint on <a href='https://arxiv.org/pdf/2602.21297' style='text-decoration: none; color: #2563eb;'>robust AI evaluation</a> using social choice theory. Work done with the great Serena Wang, Daniel Halpern, Itai Shapira, Flavio Calmon, and Ariel Procaccia.",
    showOnHomepage: false,
    categories: ["publication"]
  },
  {
    date: "9/25",
    title: "",
    description: "Extremely happy to share that our work on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking</a> in large language models was accepted to NeurIPS 2025 as a <strong>Spotlight Paper</strong>! I am also thankful for the NeurIPS Scholar Award.",
    showOnHomepage: true,
    categories: ["publication", "award", "milestone", "research"]
  },
  {
    date: "9/25",
    title: "",
    description: "Just started my second year of PhD!",
    showOnHomepage: false,
    categories: ["milestone"]
  },
  {
    date: "9/25",
    title: "",
    description: "I am at Amazon NYC presenting <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking</a> at the NY Reinforcement Learning Workshop.",
    showOnHomepage: false,
    categories: ["research", "travel"]
  },
  {
    date: "8/25",
    title: "",
    description: "I am at Princeton attending the Machine Learning Theory Summer School.",
    showOnHomepage: false,
    categories: ["travel"]
  },
  {
    date: "7/25",
    title: "",
    description: "I am at ICML, presenting our work on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>reward hacking</a> at the Models of Human Feedback for AI Alignment Workshop. Grateful to have been awarded the Hudson River Trading travel grant.",
    showOnHomepage: false,
    categories: ["research", "travel"]
  },
  {
    date: "6/25",
    title: "",
    description: "I am at University of Minnesota attending the North America School of Information Theory.",
    showOnHomepage: false,
    categories: ["travel"]
  },
  {
    date: "5/25",
    title: "",
    description: "I just finished my first year of PhD at Harvard!",
    showOnHomepage: false,
    categories: ["milestone"]
  },
  {
    date: "4/25",
    title: "",
    description: "Our paper on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>discretion</a> in AI alignment was accepted to ACM FAccT 2025!",
    showOnHomepage: false,
    categories: ["publication", "research"]
  },
  {
    date: "3/25",
    title: "",
    description: "I am at Yale, giving a talk on <a href='#research-title' style='text-decoration: none; color: #2563eb;'>discretion</a> in AI alignment. Happy to share that this work got the <span class='best-paper-award' style='cursor: pointer; font-weight: bold;'>Best Paper Award</span> at the New England NLP workshop! You can check my slides <a href='/AI Alignment at your Discretion - 04 11 25.pdf' target='_blank' rel='noopener noreferrer' style='text-decoration: none; color: #2563eb;'>here</a>.",
    showOnHomepage: true,
    categories: ["award", "research", "travel"]
  },
  {
    date: "9/24",
    title: "",
    description: "I joined Harvard as a PhD student in Flavio Calmon's group! Happy to be supported by the Harvard Prize Fellowship.",
    showOnHomepage: true,
    categories: ["award", "milestone"]
  },
];
