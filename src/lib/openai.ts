import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

// OpenRouter configuration (based on the sk-or-v1 prefix)
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://resume-builder.example.com", // Optional, for OpenRouter rankings
    "X-Title": "AI Resume Builder", // Optional, for OpenRouter rankings
  }
});

export const generateSummary = async (hint: string, jobTitle: string, skills: string[]) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    You are an expert resume writer. Write a professional resume summary based on the following:
    Job Title: ${jobTitle}
    Skills: ${skills.join(", ")}
    User Hint: ${hint}

    Requirements:
    - 2-4 professional sentences.
    - Focus on achievements and key strengths.
    - Use active, professional language.
    - Return ONLY the summary text without any preamble or quotes.
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo", // Default model for OpenRouter
    messages: [
      { role: "system", content: "You are an expert resume writer." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};

export const generateWorkDescription = async (role: string, company: string, hint: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    You are an expert resume writer. Write 3-4 professional bullet points for a job experience based on the following:
    Role: ${role}
    Company: ${company}
    User Hint/Context: ${hint}

    Requirements:
    - Use strong action verbs (e.g., Spearheaded, Optimized, Orchestrated).
    - Include measurable results or specific technologies where possible.
    - Format as a bulleted list starting with "• ".
    - Return ONLY the bullet points without any preamble.
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert resume writer." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};

export const generateProjectDescription = async (title: string, techStack: string, hint: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    You are an expert resume writer. Write 2-3 professional bullet points for a technical project based on the following:
    Project Title: ${title}
    Tech Stack: ${techStack}
    User Hint/Context: ${hint}

    Requirements:
    - Focus on the "What", "How", and "Result".
    - Mention specific technologies from the tech stack.
    - Format as a bulleted list starting with "• ".
    - Return ONLY the bullet points without any preamble.
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert resume writer." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    Based on the job title "${jobTitle}", suggest 10 relevant professional and technical skills.
    Existing skills: ${currentSkills.join(", ")}

    Requirements:
    - Provide a mix of hard and soft skills.
    - Return ONLY a comma-separated list of skills.
    - Do not include any preamble, numbers, or quotes.
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert resume writer." },
      { role: "user", content: prompt }
    ],
    temperature: 0.5,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};

export const suggestTechStack = async (projectName: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    Based on the project name "${projectName}", suggest a modern tech stack (languages, frameworks, databases).
    
    Requirements:
    - Provide a comma-separated list.
    - Max 5-6 items.
    - Return ONLY the list without any preamble or quotes.
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert technical consultant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.6,
  });

  return response.choices[0]?.message?.content?.trim() || "";
};

export const analyzeJobMatch = async (resumeData: any, jobDescription: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing.");
  }

  const prompt = `
    You are an expert ATS (Applicant Tracking System) analyzer. 
    Analyze the match between this resume and the job description.
    
    RESUME DATA:
    ${JSON.stringify(resumeData)}
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    Requirements:
    - Return a JSON object ONLY.
    - Structure:
      {
        "score": number (0-100),
        "matchingSkills": string[] (max 8),
        "missingKeywords": string[] (max 8),
        "tips": string[] (max 3 actionable tips)
      }
    - Be realistic with the score.
    - Matching skills should be what the resume already has.
    - Missing keywords should be specific terms/skills in the job desc but missing in the resume.
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert ATS analyzer. Return JSON ONLY." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content || "{}";
  return JSON.parse(content);
};

export const correctSpelling = async (text: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    Fix all spelling mistakes, grammar errors, and typos in the following text.
    Keep the original meaning, tone, and structure exactly the same.
    Do NOT rephrase, shorten, or expand the content.
    Return ONLY the corrected text without any explanation or preamble.

    Text to correct:
    "${text}"
  `;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a professional proofreader. Fix spelling and grammar only. Return ONLY the corrected text." },
      { role: "user", content: prompt }
    ],
    temperature: 0.1,
  });

  return response.choices[0]?.message?.content?.trim().replace(/^"|"$/g, '') || text;
};

export const tailorResumeFromImageOrPdf = async (base64Images: string[], jobDescription: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    Analyze the attached resume image(s) and rewrite the candidate's resume content to align with this Job Description:
    
    JOB DESCRIPTION:
    """
    ${jobDescription}
    """
    
    TASK:
    1. Extract all resume details (personal info, education, work experience, projects, skills, certifications, languages).
    2. Automatically tailor/rewrite the resume to match the Job Description:
       - Tailor skills: ensure key skills and keywords from the Job Description are included, provided they can be logically matched or adapted based on the candidate's background.
       - Tailor projects: translate and convert projects to use the technologies requested in the Job Description. E.g., if a project was built with Python but the Job Description requires Java, convert the project descriptions, technologies, and title (if appropriate) to be Java-based (using Java/Spring Boot/Maven patterns) while keeping the same core business goal of the project.
       - Tailor work experience: adapt the role names (if similar) and rewrite experience bullet points to match the responsibilities and key verbs of the Job Description.
       - Tailor summary: write a 2-4 sentence professional summary focusing on the key match points with the job.
    3. Analyze the visual design layout of the uploaded resume image. Choose the closest matching template ID from these:
       - "ats-classic": If it is a clean, single-column, text-only standard ATS layout.
       - "modern-minimal": If it is a two-column layout (sidebar + main column) without a photo.
       - "corporate-blue": If it has a dark blue/navy header bar at the top without a photo.
       - "tech-dark": If it has a dark theme or dark background sidebar.
       - "elegant-serif": If it has elegant serif serif typography and centered headers.
       - "photo-teal": If it has a circular profile photo on a teal left sidebar.
       - "photo-navy": If it has a profile photo with a navy header.
    4. Generate a unique, short ID string (like a UUID or simple unique ID, e.g. "edu-1", "exp-1") for every item in arrays like education, workExperience, projects, certifications, and languages.
    5. Return the tailored resume data strictly in the JSON format below. Return ONLY the JSON object. Do NOT wrap it in markdown code blocks.
    
    JSON FORMAT SPECIFICATION:
    {
      "recommendedTemplateId": "ats-classic" or "modern-minimal" or "corporate-blue" or "tech-dark" or "elegant-serif" or "photo-teal" or "photo-navy",
      "personalInfo": {
        "fullName": "Name from resume",
        "email": "Email from resume",
        "phone": "Phone from resume",
        "address": "Address/Location from resume",
        "linkedIn": "LinkedIn URL or empty string",
        "github": "GitHub URL or empty string",
        "profilePhoto": "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        "jobTitle": "Target job title matching the job description",
        "website": "Personal website or empty string"
      },
      "summary": "Tailored professional summary (2-4 sentences)",
      "education": [
        {
          "id": "generate-unique-id-1",
          "degree": "Degree (e.g. B.Tech in CSE)",
          "college": "University/College",
          "year": "Year of passing (e.g. 2024)",
          "grade": "Grade/CGPA (e.g. 8.5)"
        }
      ],
      "workExperience": [
        {
          "id": "generate-unique-id-2",
          "company": "Company Name",
          "role": "Tailored Role Title",
          "startDate": "YYYY-MM or YYYY-MM-DD",
          "endDate": "YYYY-MM or YYYY-MM-DD",
          "current": false,
          "description": "Tailored job bullet points, starting with \"• \" and separated by newlines"
        }
      ],
      "skills": [
        "Tailored Skill 1", "Tailored Skill 2", "..."
      ],
      "projects": [
        {
          "id": "generate-unique-id-3",
          "name": "Tailored Project Name",
          "description": "Tailored description focusing on the Job Description's requirements (e.g., converted to Java/Spring Boot), starting with \"• \" and separated by newlines",
          "techStack": "Comma-separated list of tech stack (e.g., Java, Spring Boot, PostgreSQL, Docker)",
          "link": "Project link or empty string"
        }
      ],
      "certifications": [
        {
          "id": "generate-unique-id-4",
          "name": "Certification Name",
          "issuer": "Issuer",
          "year": "Year",
          "link": "https://..."
        }
      ],
      "languages": [
        {
          "id": "generate-unique-id-5",
          "name": "Language",
          "proficiency": "Beginner" or "Intermediate" or "Advanced" or "Native"
        }
      ]
    }
  `;

  const response = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...base64Images.map(img => ({
            type: "image_url",
            image_url: { url: img }
          }))
        ] as any
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 3000,
  });

  const content = response.choices[0]?.message?.content || "{}";
  return JSON.parse(content);
};

export const tailorCurrentResume = async (currentResume: any, jobDescription: string) => {
  if (!API_KEY) {
    throw new Error("OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file.");
  }

  const prompt = `
    You are an expert resume writer. Rewrite the candidate's current resume data to align with the provided Job Description.
    
    CURRENT RESUME DATA:
    ${JSON.stringify(currentResume)}
    
    JOB DESCRIPTION:
    """
    ${jobDescription}
    """
    
    TASK:
    1. Tailor the skills: add key skills from the Job Description that are relevant.
    2. Tailor projects: convert projects to use the technologies in the Job Description. E.g. if the original project is Python, but the JD requires Java, convert the projects to Java (Spring Boot, etc.) and rewrite descriptions accordingly while keeping the core business logic of the project.
    3. Tailor work experiences: adapt description bullets to highlight responsibilities and action verbs from the JD.
    4. Tailor professional summary: rewrite it to focus on matching keywords.
    5. Maintain existing personal details, education records, languages, and certifications (though you can refine titles or descriptions slightly to better align with the JD).
    
    Return the tailored resume strictly in the JSON format matching the ResumeData interface.
    Do NOT wrap in markdown code blocks. Output JSON ONLY.
  `;

  const response = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: "You are an expert resume writer. You tailor resumes to match job descriptions. Return JSON ONLY." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 3000,
  });

  const content = response.choices[0]?.message?.content || "{}";
  return JSON.parse(content);
};
