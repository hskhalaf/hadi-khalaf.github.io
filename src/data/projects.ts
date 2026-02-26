export interface Project {
  title: string;
  tldr: string;
  linkUrl?: string;
}

export const projectData: Project[] = [
  {
    title: "SafetyConflicts Dataset",
    tldr: "We generate realistic user prompts that cause conflicts and tradeoffs between OpenAI's model specs.",
    linkUrl: "https://huggingface.co/datasets/hadikhalaf/safetyconflicts"
  },
];
