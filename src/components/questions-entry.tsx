interface QuestionData {
    title: string;
    description: string;
  }
  
  interface QuestionsEntryProps {
    question: QuestionData;
  }
  
  export function QuestionsEntry({ question }: QuestionsEntryProps) {
    return (
      <div className="bg-white p-6 rounded-lg border border-zinc-200">
        <h3 className="font-serif text-zinc-900 mb-2">{question.title}</h3>
        <p className="text-zinc-700 leading-relaxed">{question.description}</p>
      </div>
    );
  }