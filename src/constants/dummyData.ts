import type { ResumeData } from '../types/resume';

export const dummyResumeData: ResumeData = {
  personalInfo: {
    fullName: 'ROHIT SHARMA',
    email: 'rohit.sharma@example.com',
    phone: '+91 98765-43210',
    address: 'Noida, Uttar Pradesh, India',
    linkedIn: 'linkedin.com/in/rohit-sharma-dev',
    github: 'github.com/rohit-sharma-dev',
    profilePhoto: '', // User can upload their own, but template has placeholder
    jobTitle: 'Senior Frontend Engineer',
    website: 'rohitdev.io',
  },
  summary: 'Passionate Frontend Engineer with 4+ years of experience specializing in building highly interactive, accessible, and performant web applications using React, TypeScript, and modern state management. Experienced in leading small developer teams and collaborating closely with design groups to build pixel-perfect user experiences.',
  education: [
    {
      id: '1',
      degree: 'Master of Computer Applications (MCA)',
      college: 'DELHI TECHNOLOGICAL UNIVERSITY, NEW DELHI',
      year: '2022 - 2024',
      grade: 'First Division',
    },
    {
      id: '2',
      degree: 'Bachelor of Computer Applications (BCA)',
      college: 'AMITY UNIVERSITY, NOIDA',
      year: '2019 - 2022',
      grade: 'CGPA: 8.5/10',
    }
  ],
  workExperience: [
    {
      id: '1',
      company: 'AOSC Technologies',
      role: 'Senior Frontend Engineer',
      startDate: '2024-06',
      endDate: 'Present',
      current: true,
      description: 'Architected and developed modular UI components in React and TypeScript, accelerating release cycles by 25%.\nSpearheaded performance optimization efforts across core landing portals, improving load times by 1.2 seconds.\nMentored junior engineers and established robust codebase structures and review processes.',
    },
    {
      id: '2',
      company: 'TechSolutions Ltd.',
      role: 'Software Engineer',
      startDate: '2022-07',
      endDate: '2024-05',
      current: false,
      description: 'Implemented responsive web layout modules using clean CSS and React, enhancing mobile responsiveness.\nDesigned automated unit test coverage using Vitest, achieving a consistent 85% test coverage threshold.\nCollaborated on RESTful API design workflows to enable real-time messaging subsystems.',
    }
  ],
  skills: [
    'Programming: JavaScript, TypeScript, Python, SQL',
    'Libraries & Frameworks: React, Next.js, Redux, TailwindCSS',
    'Tools & Methods: Git, GitHub Actions, Docker, CI/CD, Agile',
    'Developer Practices: Pixel-perfect UI, Responsive Design, Accessibility'
  ],
  projects: [
    {
      id: '1',
      name: 'Interactive Analytics Platform',
      description: 'Designed and built an end-to-end interactive dashboard for visualizing cloud cost distributions and API usage in real-time.',
      techStack: 'React, TypeScript, Recharts, TailwindCSS',
      link: 'github.com/rohit/analytics'
    },
    {
      id: '2',
      name: 'Enterprise Design System',
      description: 'Co-created a highly reusable headless React UI component library packaged with npm for regional team integrations.',
      techStack: 'React, TypeScript, TailwindCSS, Storybook',
      link: 'github.com/rohit/ui-system'
    },
    {
      id: '3',
      name: 'Smart Task Planner App',
      description: 'Developed an offline-first task manager featuring drag-and-drop kanban boards, markdown logs, and local state backups.',
      techStack: 'React, Redux, LocalStorage, Framer Motion',
      link: 'github.com/rohit/planner'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      year: '2024',
      link: ''
    }
  ],
  languages: [
    { id: '1', name: 'Problem-Solving', proficiency: 'Native' },
    { id: '2', name: 'Collaboration', proficiency: 'Native' },
    { id: '3', name: 'Attention to Detail', proficiency: 'Native' },
    { id: '4', name: 'Adaptability', proficiency: 'Native' }
  ],
};
