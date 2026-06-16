// ─────────────────────────────────────────────────────────────────────────────
// recreateResumeInSameFormat
// Takes resume image(s) + optional job description
// Returns a complete self-contained HTML string that visually recreates
// the uploaded resume's EXACT layout with improved / tailored content.
// ─────────────────────────────────────────────────────────────────────────────

import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://resume-builder.example.com",
    "X-Title": "AI Resume Builder",
  },
});

export const recreateResumeInSameFormat = async (
  base64Images: string[],
  jobDescription: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error(
      "OpenAI API Key is missing. Please add VITE_OPENAI_API_KEY to your .env file."
    );
  }

  const tailorInstruction = jobDescription.trim()
    ? `
ADDITIONALLY, aggressively tailor and convert the resume content to fit the following job description / target domain:
"""
${jobDescription}
"""

DOMAIN CONVERSION RULES (apply intelligently):
- PROJECTS: Convert ALL projects to use the technologies and patterns mentioned in the JD. 
  Example: If original project used Python/Flask but JD requires Java, rewrite the project description to use Java/Spring Boot while keeping the same core business goal.
  Example: If original project used React but JD requires Angular, convert to Angular.
  Keep project names conceptually similar but update tech stack in descriptions.
- SKILLS: Replace/add skills to include the key technologies and tools from the JD. Remove skills that are irrelevant to the target domain.
- WORK EXPERIENCE: Rewrite bullet points to highlight responsibilities matching the JD's required skills. Use strong action verbs from the JD domain.
- SUMMARY: Rewrite the professional summary (2-4 sentences) to position the candidate as ideal for this specific role/domain.
- CERTIFICATIONS: If any certifications exist, retain them but you may mention relevant certifications for the new domain in the summary.
- Keep all personal info (name, email, phone, links) exactly the same.
- Keep dates (start/end dates for jobs and education) exactly the same.
`
    : `Just clean up the content for professional quality. Fix any spelling/grammar issues. Do not change any factual information.`;

  const prompt = `
You are an expert resume designer and HTML/CSS developer.

Your task:
1. Carefully analyze the uploaded resume image(s).
2. Extract ALL text content: name, contact info, summary, education, experience, skills, projects, certifications, etc.
3. Reproduce the EXACT SAME visual layout and design using clean HTML + inline CSS:
   - Same color scheme (headers, sidebar, accent colors)
   - Same font sizes and weights
   - Same section order
   - Same column layout (single-column or two-column sidebar)
   - Same spacing, borders, dividers
   - Same section headers style
   - Profile photo if present (use placeholder: https://cdn-icons-png.flaticon.com/512/149/149071.png)
4. ${tailorInstruction}

CRITICAL RULES:
- Output ONLY raw HTML. Start with <!DOCTYPE html>. Do NOT wrap in markdown code blocks.
- Use ONLY inline styles (no <style> tags, no external CSS).
- Use A4 paper size: width exactly 794px, auto height.
- Fonts: use Google Fonts via @import in a <style> tag is allowed only for font imports.
- Make it pixel-perfect to the original layout.
- All text must be selectable (no images for text).
- Do NOT add any content that is not in the original resume (unless tailoring for JD).
- Page background should be white (#ffffff).
- The HTML must be completely self-contained and render correctly in a browser iframe.
`;

  const response = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...base64Images.map((img) => ({
            type: "image_url" as const,
            image_url: { url: img },
          })),
        ],
      },
    ],
    temperature: 0.2,
    max_tokens: 8000,
  });

  let html = response.choices[0]?.message?.content || "";

  // Strip markdown code fences if AI wrapped anyway
  html = html
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  if (!html.toLowerCase().includes("<!doctype")) {
    throw new Error(
      "AI did not return valid HTML. Please try again with a clearer resume image."
    );
  }

  return html;
};
