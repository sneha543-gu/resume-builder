import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ChevronLeft, Layout, Loader2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/resume/ResumePreview';
import { fireSingleBurst } from '../utils/confetti';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function DownloadPage() {
  const { selectedTemplate } = useResume();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fireSingleBurst();
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.querySelector('.resume-paper') as HTMLElement;
    if (!element) return;

    setIsDownloading(true);

    // Save original styles
    const originalShadow = element.style.boxShadow;
    const originalBorder = element.style.border;
    const originalRadius = element.style.borderRadius;

    // Apply clean styles for capturing
    element.style.boxShadow = 'none';
    element.style.border = 'none';
    element.style.borderRadius = '0';

    try {
      // Small delay to ensure render is updated without border/shadow
      await new Promise((resolve) => setTimeout(resolve, 150));

      const canvas = await html2canvas(element, {
        scale: 2, // 2x scale for crisp print quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

      // Scale to fit single page if it fits nicely, otherwise split logically
      if (imgHeight <= pdfHeight * 1.18) {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      } else {
        // Multi-page PDF logic
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      pdf.save('resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Restore original styling
      element.style.boxShadow = originalShadow;
      element.style.border = originalBorder;
      element.style.borderRadius = originalRadius;
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Background Blobs */}
      <div className="no-print blob-container opacity-5">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Dynamic Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            width: 210mm !important;
            height: auto !important;
            overflow: visible !important;
          }
          #root { 
            margin: 0 !important; 
            padding: 0 !important; 
            width: 210mm !important; 
          }
          .document-wrapper { 
            padding: 0 !important; 
            margin: 0 !important; 
            background: white !important; 
            width: 210mm !important;
          }
          .resume-paper { 
            box-shadow: none !important; 
            border: none !important; 
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            max-width: 210mm !important;
            min-height: 297mm !important;
            overflow: visible !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          /* Force resume template and all wrapper divs to match exactly A4 size */
          .resume-paper > div {
            width: 210mm !important;
            max-width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
          }
          .resume-paper > div > div {
            width: 210mm !important;
            max-width: 210mm !important;
            transform: none !important;
          }
          .resume-template {
            width: 210mm !important;
            max-width: 210mm !important;
            min-height: 297mm !important;
            border-radius: 0 !important;
            box-sizing: border-box !important;
          }
          /* Strip all intermediate wrappers and set to A4 width */
          main.document-wrapper,
          main.document-wrapper > div,
          main.document-wrapper > div > div,
          main.document-wrapper > div > div > div {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            max-width: 210mm !important;
            min-height: 0 !important;
            display: block !important;
          }
        }
        @page { size: A4; margin: 0; }
      `}} />

      {/* Top Professional Toolbar */}
      <header className="no-print fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-[var(--border-color)] z-50 shadow-sm flex items-center justify-center px-4">
        <div className="max-w-6xl w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/builder')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              title="Go Back"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="h-8 w-[1px] bg-[var(--border-color)] mx-2" />
            <div className="hidden sm:block">
              <h1 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Final Resume</h1>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ready to download</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px',
                borderRadius: 12, background: 'var(--color-primary)', color: 'white', fontWeight: 700,
                cursor: 'pointer', border: 'none', boxShadow: '0 8px 20px rgba(79,70,229,0.3)',
                opacity: isDownloading ? 0.7 : 1
              }}
              className="transition-all hover:opacity-90 active:scale-95"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Downloading...
                </>
              ) : (
                <>
                  <Download size={18} /> Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Area */}
      <main style={{ marginTop: '140px' }} className="document-wrapper pb-20 px-4 md:px-8">
        <div className="w-full flex justify-center">
          {/* Centered Resume Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >

            {/* The Resume Paper Container */}
            <div className="flex justify-center items-start w-full min-h-[1123px] py-4 overflow-visible">
              <div
                className="resume-paper bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.15)] border border-slate-200/50 rounded-sm origin-top transition-all duration-500"
                style={{
                  width: '794px',
                  transform: 'scale(1)',
                  maxWidth: '100%'
                }}
              >
                <ResumePreview templateId={selectedTemplate} scale={1} />
              </div>
            </div>

            {/* Responsive Scaling Script (CSS-only) */}
            <style dangerouslySetInnerHTML={{
              __html: `
              @media (max-width: 850px) {
                .resume-paper { transform: scale(0.8) !important; }
              }
              @media (max-width: 700px) {
                .resume-paper { transform: scale(0.65) !important; }
              }
              @media (max-width: 550px) {
                .resume-paper { transform: scale(0.5) !important; }
              }
              @media (max-width: 400px) {
                .resume-paper { transform: scale(0.4) !important; }
              }
            `}} />
          </motion.div>

        </div>
      </main>

      {/* Re-open Builder Floating Action */}
      <button
        onClick={() => navigate('/builder')}
        className="no-print fixed bottom-8 right-8 w-14 h-14 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-full shadow-xl flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-all hover:scale-110 active:scale-90"
        title="Edit Resume"
      >
        <Layout size={20} />
      </button>
    </div>
  );
}
