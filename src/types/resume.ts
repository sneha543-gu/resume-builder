export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  profilePhoto: string; // base64 or URL
  jobTitle: string;
  website: string;
}

export interface Education {
  id: string;
  degree: string;
  college: string;
  year: string;
  grade: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
}

export type TemplateId =
  | 'ats-classic'
  | 'modern-minimal'
  | 'corporate-blue'
  | 'tech-dark'
  | 'elegant-serif'
  | 'bold-impact'
  | 'compact-ats'
  | 'green-fresh'
  | 'midnight-pro'
  | 'slate-modern'
  | 'purple-pro'
  | 'orange-modern'
  | 'timeline-clean'
  | 'executive-dark'
  | 'minimal-lines'
  | 'photo-teal'
  | 'photo-navy'
  | 'photo-warm'
  | 'photo-split'
  | 'photo-corp-pro'
  | 'corporate-pro'
  | 'creative-designer'
  | 'dark-sidebar'
  | 'elegant-classic'
  | 'executive-elite'
  | 'aosc-nav-v2'
  | 'aqua-modern'
  | 'rose-gold'
  | 'forest-green'
  | 'crimson-classic'
  | 'amber-executive'
  | 'sky-blue-minimal'
  | 'charcoal-modern'
  | 'violet-pro'
  | 'mono-clean'
  | 'teal-timeline'
  | 'deep-blue-two-col'
  | 'mint-fresh'
  | 'ruby-pro'
  | 'photo-rose'
  | 'photo-forest'
  | 'photo-midnight'
  | 'photo-violet'
  | 'photo-amber'
  | 'photo-arctic'
  | 'photo-olive'
  | 'photo-crimson'
  | 'aosc-portfolio'
  | 'aosc-portfolio-shaurya'
  | 'aosc-portfolio-sohit';





export interface ResumeTemplate {
  id: TemplateId;
  name: string;
  description: string;
  accentColor: string;
  thumbnail: string;
}

export type FormStep =
  | 'personal'
  | 'summary'
  | 'education'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages';

export const FORM_STEPS: { id: FormStep; label: string; icon: string }[] = [
  { id: 'personal', label: 'Personal', icon: 'User' },
  { id: 'summary', label: 'Summary', icon: 'FileText' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'skills', label: 'Skills', icon: 'Zap' },
  { id: 'projects', label: 'Projects', icon: 'Code' },
  { id: 'certifications', label: 'Certifications', icon: 'Award' },
  { id: 'languages', label: 'Languages', icon: 'Globe' },
];
