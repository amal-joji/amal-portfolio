export const codeForGoodExperience = {
  organization: 'JPMORGAN CHASE & CO.',
  program: 'CODE FOR GOOD',
  badge: 'FINALIST',
  heading: 'MY CODE FOR GOOD EXPERIENCE',
  subtitle: 'Five moments that shaped my experience at JPMorgan Chase.',
  stages: [
    {
      id: 1,
      number: '01',
      title: 'Collaborative software development',
      bgWord: 'COLLABORATE',
      image: '/images/cfg/cfg-01.jpg',
      description:
        'An opportunity to collaborate with fellow developers, exchange ideas and work together in a fast-paced hackathon environment.',
    },
    {
      id: 2,
      number: '02',
      title: 'Problem-solving under time constraints',
      bgWord: 'CHALLENGE',
      image: '/images/cfg/cfg-02.jpg',
      description:
        'Working through technical challenges, evaluating possible approaches and making decisions within a limited development timeframe.',
    },
    {
      id: 3,
      number: '03',
      title: 'Translating real-world challenges into solutions',
      bgWord: 'IDEATE',
      image: '/images/cfg/cfg-03.jpg',
      description:
        'Understanding the problem, exploring possible solutions and translating ideas into a practical technical approach.',
    },
    {
      id: 4,
      number: '04',
      title: 'Teamwork and engineering collaboration',
      bgWord: 'TOGETHER',
      image: '/images/cfg/cfg-04.jpg',
      description:
        'Collaborating across different perspectives, sharing technical ideas and contributing to a common development goal.',
    },
    {
      id: 5,
      number: '05',
      title: 'Building functional solutions through rapid development',
      bgWord: 'BUILD',
      image: '/images/cfg/cfg-05.jpg',
      description:
        'Experiencing the process of turning an idea into a working solution through rapid development, iteration and problem-solving.',
    },
  ],
};

// Kept for backward compatibility if referenced elsewhere
export const experiences = [
  {
    id: 1,
    number: '01',
    title: 'JPMORGAN CHASE & CO.',
    subtitle: 'CODE FOR GOOD',
    role: 'Code for Good Hackathon Finalist',
    organization: 'JPMorgan Chase & Co.',
    type: 'Hackathon / Collaborative Software Development Experience',
    badge: 'FINALIST',
    description:
      "Selected as a finalist in JPMorgan Chase's Code for Good hackathon, participating in a collaborative problem-solving and software development experience focused on building technology-driven solutions.",
    highlights: codeForGoodExperience.stages.map((s) => s.title),
  },
];
