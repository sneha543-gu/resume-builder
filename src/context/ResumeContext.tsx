import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';
import type {
  ResumeData,
  PersonalInfo,
  Education,
  WorkExperience,
  Project,
  Certification,
  Language,
  TemplateId,
} from '../types/resume';

// ─── Initial State ────────────────────────────────────────────────────────────

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  linkedIn: '',
  github: '',
  profilePhoto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  jobTitle: '',
  website: '',
};

export const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  summary: '',
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

// ─── Action Types ─────────────────────────────────────────────────────────────

type Action =
  | { type: 'UPDATE_PERSONAL'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: Education }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: WorkExperience }
  | { type: 'UPDATE_EXPERIENCE'; payload: WorkExperience }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'SET_SKILLS'; payload: string[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: Certification }
  | { type: 'REMOVE_CERTIFICATION'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: Language }
  | { type: 'UPDATE_LANGUAGE'; payload: Language }
  | { type: 'REMOVE_LANGUAGE'; payload: string }
  | { type: 'REORDER_SECTION'; payload: { section: keyof Omit<ResumeData, 'personalInfo' | 'summary' | 'skills'>; startIndex: number; endIndex: number } }
  | { type: 'LOAD_DUMMY'; payload: ResumeData }
  | { type: 'RESET' };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function resumeReducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((e) => (e.id === action.payload.id ? action.payload : e)),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((e) => e.id !== action.payload) };
    case 'ADD_EXPERIENCE':
      return { ...state, workExperience: [...state.workExperience, action.payload] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter((e) => e.id !== action.payload),
      };
    case 'SET_SKILLS':
      return { ...state, skills: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((p) => p.id !== action.payload) };
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter((c) => c.id !== action.payload),
      };
    case 'ADD_LANGUAGE':
      return { ...state, languages: [...state.languages, action.payload] };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map((l) => (l.id === action.payload.id ? action.payload : l)),
      };
    case 'REMOVE_LANGUAGE':
      return { ...state, languages: state.languages.filter((l) => l.id !== action.payload) };
    case 'REORDER_SECTION': {
      const { section, startIndex, endIndex } = action.payload;
      const list = [...state[section]] as any[];
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);
      return { ...state, [section]: list };
    }
    case 'LOAD_DUMMY':
      return action.payload;
    case 'RESET':
      return initialResumeData;
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ResumeContextValue {
  resumeData: ResumeData;
  dispatch: React.Dispatch<Action>;
  selectedTemplate: TemplateId;
  setSelectedTemplate: (t: TemplateId) => void;
  currentStep: number;
  setCurrentStep: (n: number) => void;
  isDark: boolean;
  toggleTheme: () => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isDummyPreview: boolean;
}

const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

// const STORAGE_KEY = 'resumecraft_data';

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  // Track whether current data is dummy preview data — never save it to localStorage
  const isDummyPreviewRef = useRef(false);
  const [isDummyPreview, setIsDummyPreview] = React.useState(false);

  const [resumeData, rawDispatch] = useReducer(resumeReducer, initialResumeData, () => {
    try {
      const saved = localStorage.getItem('resumecraft_user_data');
      if (!saved) return initialResumeData;
      const parsed = JSON.parse(saved);
      // Safety: if somehow dummy data crept in, ignore it
      const name = parsed?.personalInfo?.fullName || '';
      const knownDummy = [
        'ROHIT SHARMA', 'AARAV SHARMA', 'RITIKA SEN', 'MARCUS VANCE', 'JANE DOE', 'JOHN DOE', 'SARAH J',
        'ARJUN MEHTA', 'ANANYA IYER', 'KABIR MEHRA', 'NEHA GUPTA', 'ROHAN VERMA', 'VIKRAM MALHOTRA',
        'ADITYA ROY', 'DR. PRIYA NAIR', 'AMITABH BOSE', 'MEGHA SHARMA', 'ISHAN VERMA', 'NIDHI SINGH',
        'DEV KAPOOR', 'SUNEHA SHARMA', 'SHAURYA VERMA', 'SOHIT VERMA'
      ];
      if (knownDummy.some(d => name.toUpperCase().includes(d.split(' ')[0]))) {
        localStorage.removeItem('resumecraft_user_data');
        return initialResumeData;
      }
      return parsed;
    } catch {
      return initialResumeData;
    }
  });

  // Wrapped dispatch: LOAD_DUMMY marks preview mode; all real edits clear it
  const dispatch = useCallback((action: Action) => {
    if (action.type === 'LOAD_DUMMY') {
      isDummyPreviewRef.current = true;
      setIsDummyPreview(true);
    } else {
      isDummyPreviewRef.current = false;
      setIsDummyPreview(false);
    }
    rawDispatch(action);
  }, [rawDispatch]);

  const [selectedTemplate, setSelectedTemplateState] = React.useState<TemplateId>(() => {
    const saved = localStorage.getItem('resumecraft_template');
    return (saved as TemplateId) || 'minimalist-clean';
  });
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem('resumecraft_theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('resumecraft_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Only persist REAL user data — never dummy preview data
  useEffect(() => {
    if (!isDummyPreviewRef.current) {
      localStorage.setItem('resumecraft_user_data', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Persist selectedTemplate to localStorage whenever it changes
  const setSelectedTemplate = (t: TemplateId) => {
    setSelectedTemplateState(t);
    localStorage.setItem('resumecraft_template', t);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        dispatch,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
        isDark,
        toggleTheme,
        errors,
        setErrors,
        isDummyPreview,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
