export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  scope: string[];
};

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack AI Product \u00b7 Graduation Project',
    company: 'VirtAI',
    period: 'Dec 2025 \u2014 Jun 2026',
    description:
      'Owned the engineering layer across frontend, backend, real-time communication, infrastructure, and deployment. Integrated AI capabilities into a Clean Architecture and continuously refactored the system as it evolved.',
    scope: ['Frontend', 'Backend', 'WebSockets', 'Security', 'Docker', 'DevOps'],
  },
  {
    id: 'exp-2',
    role: 'Generative AI Professional',
    company: 'DEPI \u00b7 Digital Egypt Pioneers Program',
    period: 'Jun 2025 \u2014 Dec 2025',
    description:
      'Completed the Generative AI Professional program within the Digital Egypt Pioneers Program, building a structured foundation from machine learning and deep learning through NLP and modern generative AI systems.',
    scope: ['Machine Learning', 'Deep Learning', 'NLP', 'Generative AI', 'LLMs'],
  },
  {
    id: 'exp-3',
    role: 'B.Sc. Artificial Intelligence & Data Science',
    company: 'Menoufia University',
    period: '2022 — 2026',
    description:
      'Formal academic foundation in computer science and artificial intelligence. Studied algorithms, data structures, mathematics, and advanced AI methodologies while concurrently building full-stack production systems.',
    scope: ['Computer Science', 'Artificial Intelligence', 'Data Science'],
  },
];
