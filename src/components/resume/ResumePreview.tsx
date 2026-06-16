import { useResume } from '../../context/ResumeContext';
import ATSClassic from '../../templates/ATSClassic';
import ModernMinimal from '../../templates/ModernMinimal';
import CorporateBlue from '../../templates/CorporateBlue';
import TechDark from '../../templates/TechDark';
import ElegantSerif from '../../templates/ElegantSerif';
import BoldImpact from '../../templates/BoldImpact';
import CompactATS from '../../templates/CompactATS';
import GreenFresh from '../../templates/GreenFresh';
import MidnightPro from '../../templates/MidnightPro';
import SlateModern from '../../templates/SlateModern';
import PurplePro from '../../templates/PurplePro';
import OrangeModern from '../../templates/OrangeModern';
import TimelineClean from '../../templates/TimelineClean';
import ExecutiveDark from '../../templates/ExecutiveDark';
import MinimalLines from '../../templates/MinimalLines';
import PhotoTeal from '../../templates/PhotoTeal';
import PhotoNavy from '../../templates/PhotoNavy';
import PhotoWarm from '../../templates/PhotoWarm';
import PhotoSplit from '../../templates/PhotoSplit';
import PhotoCorpPro from '../../templates/PhotoCorpPro';
import CorporatePro from '../../templates/CorporatePro';
import CreativeDesigner from '../../templates/CreativeDesigner';
import DarkSidebar from '../../templates/DarkSidebar';
import ElegantClassic from '../../templates/ElegantClassic';
import ExecutiveElite from '../../templates/ExecutiveElite';
import AOSCNavV2 from '../../templates/AOSCNavV2';
import AOSCPortfolio from '../../templates/AOSCPortfolio';
import AOSCPortfolioShaurya from '../../templates/AOSCPortfolioShaurya';
import AOSCPortfolioSohit from '../../templates/AOSCPortfolioSohit';
import AquaModern from '../../templates/AquaModern';
import RoseGold from '../../templates/RoseGold';
import ForestGreen from '../../templates/ForestGreen';
import CrimsonClassic from '../../templates/CrimsonClassic';
import AmberExecutive from '../../templates/AmberExecutive';
import SkyBlueMinimal from '../../templates/SkyBlueMinimal';
import CharcoalModern from '../../templates/CharcoalModern';
import VioletPro from '../../templates/VioletPro';
import MonoClean from '../../templates/MonoClean';
import TealTimeline from '../../templates/TealTimeline';
import DeepBlueTwoCol from '../../templates/DeepBlueTwoCol';
import MintFresh from '../../templates/MintFresh';
import RubyPro from '../../templates/RubyPro';
import PhotoRose from '../../templates/PhotoRose';
import PhotoForest from '../../templates/PhotoForest';
import PhotoMidnight from '../../templates/PhotoMidnight';
import PhotoViolet from '../../templates/PhotoViolet';
import PhotoAmber from '../../templates/PhotoAmber';
import PhotoArctic from '../../templates/PhotoArctic';
import PhotoOlive from '../../templates/PhotoOlive';
import PhotoCrimson from '../../templates/PhotoCrimson';

import type { TemplateId, ResumeData } from '../../types/resume';
import { getDummyDataForTemplate } from '../../constants/templateDummyData';

interface Props {
  templateId?: TemplateId;
  scale?: number;
}

export default function ResumePreview({ templateId, scale = 1.0 }: Props) {
  const { resumeData, selectedTemplate } = useResume();
  const activeTemplate = templateId ?? (selectedTemplate as TemplateId);

  // Merge actual data with dummy data for preview purposes
  const fallbackData = getDummyDataForTemplate(activeTemplate);
  const previewData: ResumeData = {
    ...resumeData,
    personalInfo: {
      ...fallbackData.personalInfo,
      ...Object.fromEntries(Object.entries(resumeData.personalInfo).filter(([_, v]) => v !== '')),
    },
    summary: resumeData.summary || fallbackData.summary,
    education: resumeData.education.length > 0 ? resumeData.education : fallbackData.education,
    workExperience: resumeData.workExperience.length > 0 ? resumeData.workExperience : fallbackData.workExperience,
    skills: resumeData.skills.length > 0 ? resumeData.skills : fallbackData.skills,
    projects: resumeData.projects.length > 0 ? resumeData.projects : fallbackData.projects,
    certifications: resumeData.certifications.length > 0 ? resumeData.certifications : fallbackData.certifications,
    languages: resumeData.languages.length > 0 ? resumeData.languages : fallbackData.languages,
  };

  const templateMap: Record<TemplateId, React.ReactNode> = {
    'ats-classic':     <ATSClassic data={previewData} />,
    'modern-minimal':  <ModernMinimal data={previewData} />,
    'corporate-blue':  <CorporateBlue data={previewData} />,
    'tech-dark':       <TechDark data={previewData} />,
    'elegant-serif':   <ElegantSerif data={previewData} />,
    'bold-impact':     <BoldImpact data={previewData} />,
    'compact-ats':     <CompactATS data={previewData} />,
    'green-fresh':     <GreenFresh data={previewData} />,
    'midnight-pro':    <MidnightPro data={previewData} />,
    'slate-modern':    <SlateModern data={previewData} />,
    'purple-pro':      <PurplePro data={previewData} />,
    'orange-modern':   <OrangeModern data={previewData} />,
    'timeline-clean':  <TimelineClean data={previewData} />,
    'executive-dark':  <ExecutiveDark data={previewData} />,
    'minimal-lines':   <MinimalLines data={previewData} />,
    'photo-teal':      <PhotoTeal data={previewData} />,
    'photo-navy':      <PhotoNavy data={previewData} />,
    'photo-warm':      <PhotoWarm data={previewData} />,
    'photo-split':     <PhotoSplit data={previewData} />,
    'photo-corp-pro':  <PhotoCorpPro data={previewData} />,
    'corporate-pro':   <CorporatePro data={previewData} />,
    'creative-designer': <CreativeDesigner data={previewData} />,
    'dark-sidebar':    <DarkSidebar data={previewData} />,
    'elegant-classic': <ElegantClassic data={previewData} />,
    'executive-elite': <ExecutiveElite data={previewData} />,
    'aosc-nav-v2':            <AOSCNavV2 data={previewData} />,
    'aosc-portfolio':         <AOSCPortfolio data={previewData} />,
    'aosc-portfolio-shaurya': <AOSCPortfolioShaurya data={previewData} />,
    'aosc-portfolio-sohit':   <AOSCPortfolioSohit data={previewData} />,
    'aqua-modern':      <AquaModern data={previewData} />,
    'rose-gold':        <RoseGold data={previewData} />,
    'forest-green':     <ForestGreen data={previewData} />,
    'crimson-classic':  <CrimsonClassic data={previewData} />,
    'amber-executive':  <AmberExecutive data={previewData} />,
    'sky-blue-minimal': <SkyBlueMinimal data={previewData} />,
    'charcoal-modern':  <CharcoalModern data={previewData} />,
    'violet-pro':       <VioletPro data={previewData} />,
    'mono-clean':       <MonoClean data={previewData} />,
    'teal-timeline':    <TealTimeline data={previewData} />,
    'deep-blue-two-col':<DeepBlueTwoCol data={previewData} />,
    'mint-fresh':       <MintFresh data={previewData} />,
    'ruby-pro':         <RubyPro data={previewData} />,
    'photo-rose':       <PhotoRose data={previewData} />,
    'photo-forest':     <PhotoForest data={previewData} />,
    'photo-midnight':   <PhotoMidnight data={previewData} />,
    'photo-violet':     <PhotoViolet data={previewData} />,
    'photo-amber':      <PhotoAmber data={previewData} />,
    'photo-arctic':     <PhotoArctic data={previewData} />,
    'photo-olive':      <PhotoOlive data={previewData} />,
    'photo-crimson':    <PhotoCrimson data={previewData} />,
  };

  return (
    <div style={{ 
      borderRadius: '4px',
      margin: '0 auto',
      position: 'relative',
      width: 794 * scale,
      height: 'auto',
      minHeight: 1123 * scale,
    }}>
      <div style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: 794,
      }}>
        {templateMap[activeTemplate] || templateMap['ats-classic']}
      </div>
    </div>
  );
}
