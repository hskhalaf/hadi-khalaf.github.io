export interface QuestionData {
    title: string;
    description: string;
  }
  
  export const questionsData: QuestionData[] = [
    {
      title: "LLM Alignment Robustness",
      description: "How can we develop alignment techniques that remain stable across different model architectures and scales?"
    },
    {
      title: "Transparency in LLMs",
      description: "What tools can we build to better understand the decision-making process of large language models?"
    },
    {
      title: "Alignment Metrics",
      description: "How do we quantitatively measure and validate the effectiveness of different alignment approaches?"
    }
  ];