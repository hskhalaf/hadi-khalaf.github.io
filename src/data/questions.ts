export interface QuestionData {
    title: string;
    description: string;
  }
  
export const questionsData: QuestionData[] = [
    {
      title: "Nuanced Pairwise Preferences",
      description: "Do pairwise methods adequately capture subtle and diverse human values?"
    },
    {
      title: "Auditable Reward Models",
      description: "How might reward models function as robust and transparent AI auditing tools?"
    },
      {
        title: "Scalable Oversight via Targeted Human Feedback",
        description: "How can we design systems where infrequent yet targeted human feedback steers LLMs towards effective alignment?"
      },
      {
        title: "Multi-Agent Alignment in Complex Systems",
        description: "How can we ensure aligned behavior in systems with multiple interacting AI agents with conflicting objectives?"
      },
  ];
  