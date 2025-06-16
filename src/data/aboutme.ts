export interface AboutMe {
  name: string;
  // title: string;
  // institution: string;
  description: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  altName?: string;
  institutionUrl?: string;
}

export const aboutMe: AboutMe = {
  name: "Hadi Khalaf",
  //title: "CS Ph.D. Student",
  // institution: "Harvard University",
  // Note that links work in the description
  description:
    "I'm a first-year Computer Science PhD student at Harvard. My research focuses on developing robust and transparent tools for AI post-training. I am very fortunate to be advised by Prof. Flavio du Pin Calmon.",
  email: "hadikhalaf@g.harvard.edu",
  imageUrl: "/image0.png",
  googleScholarUrl: "https://scholar.google.com/citations?user=IxeWGPAAAAAJ&hl=en&oi=ao",
  githubUsername: "hskhalaf",
  linkedinUsername: "hadikhalaf",
  twitterUsername: "hskhalaf",
  // blogUrl: "https://",
  cvUrl: "/HadiKhalaf_CV.pdf",
  // institutionUrl: "https://www.stanford.edu",
  // altName: "",
  // secretDescription: "I like dogs.",
};
