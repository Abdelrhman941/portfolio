export type CollaboratorQuote = {
  id: string;
  quote: string;
  quoteAr?: string;
  name: string;
  relationship: string;
  project: string;
  profileUrl?: string;
  profileType?: 'linkedin' | 'github';
  avatarUrl?: string;
};

export const collaboratorsData: CollaboratorQuote[] = [
  {
    id: 'collab-1',
    quote:
      "Abdelrhman is the kind of person you feel reassured having on any heavy project. We worked together on most of our college projects, and from my experience, he is a true AI engineer who understands every detail and is genuinely masterful, whether in Generative AI and LLMs or Backend with FastAPI. His brilliance really showed while we were working together on our graduation project, the Avatar Teacher; he has an excellent mindset, works well under intense pressure, and remains calm when resolving bugs. If you're looking for someone strong who builds end-to-end systems, Abdelrhman is an asset to any team.",
    quoteAr:
      'عبد الرحمن الشخص اللي تطمن وهو معاك في أي مشروع تقيل. اشتغلنا سوا في معظم مشاريع الكلية، ومن تجربتي هو مهندس ذكاء اصطناعي حقيقي وفاهم كل تفصيلة متمكن منها بجد، سواء في الـ Generative AI والـ LLMs أو الـ Backend بـ FastAPI. شطارته ظهرت جداً وإحنا شغالين سوا في مشروع تخرجنا الـ Avatar Teacher؛ بيمتلك Mindset ممتازة، بيشتغل تحت ضغط جامد، وهادي في حل الـ Bugs. لو بتدور على حد قوي بيبني أنظمة End-to-End فعبد الرحمن مكسب لأي تيم.',
    name: 'Mostafa Nasser',
    relationship: 'Teammate',
    project: 'VirtAI',
    profileUrl: 'https://www.linkedin.com/in/mostafa-nasser-876442322/',
    profileType: 'linkedin',
  },

  {
    id: 'collab-2',
    quote:
      'I had the pleasure of working with Abdelrhman on AI projects. He is a dedicated AI Engineer who consistently met deadlines, worked efficiently under pressure, and delivered high-quality results. He is reliable, professional, and a great team player. I highly recommend him for any AI engineering role.',
    quoteAr:
      'لقد سعدت بالعمل مع عبد الرحمن في مشاريع الذكاء الاصطناعي. هو مهندس ذكاء اصطناعي متفانٍ، يلتزم دائمًا بالمواعيد النهائية، ويعمل بكفاءة تحت الضغط، ويقدم نتائج عالية الجودة. إنه شخص يمكن الاعتماد عليه، واحترافي، وعضو رائع في الفريق. أوصي به بشدة لأي دور في هندسة الذكاء الاصطناعي.',
    name: 'Abdallah Mohamed',
    relationship: 'Teammate',
    project: 'VirtAI',
    profileUrl: 'https://www.linkedin.com/in/abdallah-mohamed-alhesh/',
    profileType: 'linkedin',
  },

  {
    id: 'collab-3',
    quote:
      "I had the chance to work with Abdulrahman on several AI and Data Science projects. He's reliable, committed to his work, always meets deadlines, and is someone you can genuinely count on to get things done.",
    quoteAr:
      'لقد أتيحت لي الفرصة للعمل مع عبد الرحمن في العديد من مشاريع الذكاء الاصطناعي وعلم البيانات. إنه شخص يمكن الاعتماد عليه، ومخلص في عمله، ويلتزم دائمًا بالمواعيد النهائية، وهو شخص يمكنك الاعتماد عليه حقًا لإنجاز المهام.',
    name: 'Mohamed Ali',
    relationship: 'Teammate',
    project: 'VirtAI',
    profileUrl: 'https://github.com/mohamedali572',
    profileType: 'github',
  },

  {
    id: 'collab-4',
    quote:
      'I worked with Abdelrhman on our graduation project. He connected the backend and frontend seamlessly and was always one of the first to take the initiative when it came to solving problems or exploring new ideas for the project. Abdelrhman is highly collaborative, committed to deadlines, and genuinely passionate about his work. I highly recommend working with him for any team or project that needs someone who understands what he is doing and writes clean, stable code.',
    quoteAr:
      'اشتغلت مع عبدالرحمن في مشروع التخرج. كان بيربط بين الـ Backend والـ Frontend بسلاسة كبيرة، وكان دايمًا من أوائل الناس اللي بتبادر بمحاولة حل مشكلة أو البحث عن فكرة جديدة للمشروع. عبدالرحمن شخص متعاون جدًا، ملتزم بمواعيده، وبيحب شغله بصدق. أنصح جدًا بالتعامل معه لأي فريق أو مشروع محتاج حد فاهم وكاتب كود نظيف ومستقر.',
    name: 'Hassan Zoghly',
    relationship: 'Teammate',
    project: 'AI Projects',
    profileUrl: 'https://www.linkedin.com/in/hassan-zoghly/',
    profileType: 'linkedin',
  },
];
