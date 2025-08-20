export interface Publication {
  year: string;
  conference: string;
  title: string;
  authors: string;
  paperUrl?: string;
  codeUrl?: string;
  blogUrl?: string;
  bibtex?: string;
  tldr?: string;
  imageUrl?: string;
  award?: string;
  abstract?: string;
}

export const publicationData: Publication[] = [
   {
    year: "2025",
    conference: "ICML 2nd Workshop on Models of Human Feedback for AI Alignment",
    title: "Inference-Time Reward Hacking in Large Language Models",
    authors: "<strong>HK</strong>, Claudio Mayrink Verdun, Alex Oesterling, Himabindu Lakkaraju, Flavio du Pin Calmon",
    paperUrl: "https://arxiv.org/abs/2506.19248",
    codeUrl: "https://github.com/hskhalaf/hedging",
    blogUrl: "/blog/hacking",
       tldr: "We propose hedging as a lightweight and theoretically grounded strategy to mitigate reward hacking in inference-time alignment.",
    abstract: "A common paradigm to improve the performance of large language models is optimizing for a reward model. Reward models assign a numerical score to LLM outputs indicating, for example, which response would likely be preferred by a user or is most aligned with safety goals. However, reward models are never perfect. They inevitably function as proxies for complex desiderata such as correctness, helpfulness, and safety. By overoptimizing for a misspecified reward, we can subvert intended alignment goals and reduce overall performance -- a phenomenon commonly referred to as reward hacking. In this work, we characterize reward hacking in inference-time alignment and demonstrate when and how we can mitigate it by hedging on the proxy reward. We study this phenomenon under Best-of-n (BoN) and Soft-Best-of-n (SBoN), and we introduce Best-of-Poisson (BoP) that provides an efficient, near-exact approximation of the optimal reward-KL divergence policy at inference time. We show that the characteristic pattern of hacking as observed in practice (where the true reward first increases before declining) is an inevitable property of a broad class of inference-time mechanisms, including BoN and BoP. To counter this effect, hedging offers a tactical choice to avoid placing undue confidence in high but potentially misleading proxy reward signals. We introduce HedgeTune, an efficient algorithm to find the optimal inference-time parameter and avoid reward hacking. We demonstrate through experiments that hedging mitigates reward hacking and achieves superior distortion-reward tradeoffs with minimal computational overhead."
  },
  {
    year: "2025",
    conference: "ACM Conference on Fairness, Accountability, and Transparency (FAccT)",
    title: "AI Alignment at Your Discretion",
    authors: "Maarten Buyl, <strong>HK</strong>, Claudio Mayrink Verdun, Lucas Monteiro Paes, Caio C. Vieira Machado, Flavio du Pin Calmon",
    paperUrl: "https://arxiv.org/abs/2502.10441",
    codeUrl: "https://github.com/maartenbuyl/alignment-discretionn",
    tldr: "We risk deploying unsafe AI systems if we ignore their discretion in applying alignment objectives.",
    award: "🏆 Best Paper Award - New England NLP Workshop",
    abstract: "In AI alignment, extensive latitude must be granted to annotators, either human or algorithmic, to judge which model outputs are 'better' or 'safer.' We refer to this latitude as alignment discretion. Such discretion remains largely unexamined, posing two risks: (i) annotators may use their power of discretion arbitrarily, and (ii) models may fail to mimic this discretion. To study this phenomenon, we draw on legal concepts of discretion that structure how decision-making authority is conferred and exercised, particularly in cases where principles conflict or their application is unclear or irrelevant. Extended to AI alignment, discretion is required when alignment principles and rules are (inevitably) conflicting or indecisive. We present a set of metrics to systematically analyze when and how discretion in AI alignment is exercised, such that both risks (i) and (ii) can be observed. Moreover, we distinguish between human and algorithmic discretion and analyze the discrepancy between them. By measuring both human and algorithmic discretion over safety alignment datasets, we reveal layers of discretion in the alignment process that were previously unaccounted for. Furthermore, we demonstrate how algorithms trained on these datasets develop their own forms of discretion in interpreting and applying these principles, which challenges the purpose of having any principles at all. Our paper presents the first step towards formalizing this core gap in current alignment processes, and we call on the community to further scrutinize and control alignment discretion."
  }
];