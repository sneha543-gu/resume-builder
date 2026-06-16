# Resume Builder

A sleek, AI‑powered **Resume Builder** web application that lets users craft professional, ATS‑friendly resumes with live preview, customizable templates, and AI‑driven tailoring.

## ✨ Key Features
- Live preview of resume edits
- AI tailoring for specific job domains
- One‑click PDF download (direct file download)
- Secure authentication with forced re‑login on page refresh
- Responsive, themeable templates
- Data persistence via local storage

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Vite, Framer Motion
- **Styling**: Tailwind CSS (dark mode, glassmorphism)
- **AI**: OpenAI API (Chat Completion)
- **State Management**: React Context (AuthContext, ResumeContext)
- **Build/Deploy**: Vite with strict TypeScript settings

## 🚀 Getting Started
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/resume-builder.git
   cd resume-builder
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables
   - Create a `.env.local` file at the project root
   - Add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```
4. Run the development server
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 📦 Deployment
The project builds with strict TypeScript checks. Ensure the OpenAI API key is provided in the hosting environment (e.g., Vercel, Netlify) as `VITE_OPENAI_API_KEY`.
```bash
npm run build
```
Serve the generated `dist/` folder.

## 📂 Project Structure
```
src/
├─ components/          # Reusable UI components
│   ├─ ai/               # AI‑tailor modal & logic
│   └─ layout/           # Navbar, Footer, etc.
├─ context/             # AuthContext & ResumeContext
├─ lib/                 # Utility functions (OpenAI wrapper, mock DB)
├─ pages/               # Route components (Landing, Login, SignUp, Template, Download)
├─ templates/           # Resume template components
└─ App.tsx              # Root component with routing
```

## 📜 License
MIT License – see `LICENSE` file.
"# resume-builder" 
"# resume-builder" 
