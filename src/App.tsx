import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import TemplatePage from './pages/TemplatePage';
import DownloadPage from './pages/DownloadPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SameFormatPage from './pages/SameFormatPage';
import ThemeHandler from './components/layout/ThemeHandler';
// import './styles/globals.css'; // Removed redundant import

function AppRoutes() {
  const { isLoggedIn, isLoading } = useAuth();

  // Session restore ho rahi hai — blank screen dikhao taaki flash na ho
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-page)'
      }}>
        <div style={{
          width: 40, height: 40,
          border: '3px solid var(--glass-border)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" replace /> : <SignUpPage />} />
      <Route path="/keep-format" element={isLoggedIn ? <SameFormatPage /> : <Navigate to="/" replace />} />
      <Route path="/home" element={isLoggedIn ? <LandingPage /> : <Navigate to="/" replace />} />
      <Route path="/builder" element={isLoggedIn ? <BuilderPage /> : <Navigate to="/" replace />} />
      <Route path="/templates" element={isLoggedIn ? <TemplatePage /> : <Navigate to="/" replace />} />
      <Route path="/download" element={isLoggedIn ? <DownloadPage /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <ThemeHandler />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ResumeProvider>
    </AuthProvider>
  );
}
