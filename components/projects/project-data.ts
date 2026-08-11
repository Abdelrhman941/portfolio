export type Project = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  youtube?: string;
};

export const projects: Project[] = [
  {
    id: 'virtai',
    title: 'VirtAI',
    category: 'Graduation Project / AI Education Platform',
    date: 'Jun 2026',
    description:
      'An end-to-end conversational AI system combining real-time speech, retrieval, language models, synthesis, and a 3D avatar through WebSocket streaming.',
    image: '/projects/virtai.webp',
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Three.js',
      'TypeScript',
      'Zustand',
      'WebSockets',
      'Groq API',
      'Docker',
    ],
    github: 'https://github.com/Abdelrhman941/VirtAI-Project',
  },
  {
    id: 'traffic-signs',
    title: 'Traffic Sign Detection & Classification',
    category: 'Computer Vision / Deep Learning',
    date: 'Nov 2025',
    description:
      'A custom PyTorch CNN achieving over 95% test accuracy on the GTSRB benchmark, integrated into a full-stack web application with modular preprocessing and data augmentation.',
    image: '/projects/traffic-signs.webp',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'OpenCV', 'HTML/CSS/JS'],
    github: 'https://github.com/Abdelrhman941/Traffic-Signs-Project',
    youtube: 'https://youtu.be/xWEPut6oU2Q?si=ooiSO3si4UE9Iu2e',
  },
  {
    id: 'vehicle-tracking',
    title: 'Vehicle Detection & Tracking',
    category: 'Computer Vision / Real-Time Systems',
    date: 'Dec 2023',
    description:
      'A real-time YOLOv8 system for vehicle detection, lane-based counting, and traffic classification, featuring an async FastAPI backend and live WebSocket streaming.',
    image: '/projects/vehicle-tracking.webp',
    technologies: ['Python', 'YOLOv8', 'FastAPI', 'OpenCV', 'WebSockets', 'HTML/CSS/JS'],
    github: 'https://github.com/Abdelrhman941/Vehicle-Detection-Project',
    youtube: 'https://youtu.be/f_7gi9ArWt0?si=c9O9gUl4X9BW9JKX',
  },
  {
    id: 'auto-correct',
    title: 'Auto-Correct System',
    category: 'NLP',
    date: 'May 2025',
    description:
      'A robust NLP pipeline for spelling and grammar correction utilizing Transformer-based contextual embeddings, probabilistic N-gram models, and edit distance with 92% accuracy.',
    image: '/projects/auto-correct.webp',
    technologies: [
      'Python',
      'NLTK',
      'PySpellChecker',
      'Gramformer',
      'spaCy',
      'Transformers',
      'Gradio',
    ],
    github: 'https://github.com/Abdelrhman941/Auto-Correct-Project',
  },
  {
    id: 'dqn-2048',
    title: 'DQN Agent for 2048 Game',
    category: 'Reinforcement Learning',
    date: 'May 2025',
    description:
      'A Deep Q-Network implemented from scratch with a replay buffer and target network, trained over 10,000+ episodes and served via a Flask web application.',
    image: '/projects/dqn-2048.webp',
    technologies: ['Python', 'TensorFlow', 'NumPy', 'Flask', 'Matplotlib'],
    github: 'https://github.com/Abdelrhman941/2048-Game-Project',
  },
];
