import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Share2, Code, Link2, Camera, Briefcase } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import InputField from '../ui/InputField';
import SectionCard from '../ui/SectionCard';

export default function PersonalInfo() {
  const { resumeData, dispatch, errors, setErrors, selectedTemplate } = useResume();
  const info = resumeData.personalInfo;
  const fileRef = useRef<HTMLInputElement>(null);

  // Re-validate photo requirement if template changes
  useEffect(() => {
    const templatesWithPhoto = ['classic-navy', 'blue-professional'];
    const needsPhoto = templatesWithPhoto.includes(selectedTemplate);
    
    if (needsPhoto && !info.profilePhoto) {
      setErrors((prev: any) => ({ ...prev, profilePhoto: 'Profile photo is mandatory for this template' }));
    } else if (errors.profilePhoto) {
      setErrors((prev: any) => {
        const next = { ...prev };
        delete next.profilePhoto;
        return next;
      });
    }
  }, [selectedTemplate, info.profilePhoto]);

  const validateField = (field: string, value: string) => {
    const templatesWithPhoto = ['classic-navy', 'blue-professional'];
    const needsPhoto = templatesWithPhoto.includes(selectedTemplate);

    if (!value) {
      if (field === 'fullName') return 'Full Name is required';
      if (field === 'jobTitle') return 'Job Title is required';
      if (field === 'email') return 'Email is required';
      if (field === 'phone') return 'Phone number is required';
      if (field === 'address') return 'Location is required';
      if (field === 'profilePhoto' && needsPhoto) return 'Profile photo is mandatory for this template';
      return '';
    }

    if (field === 'fullName' && value.length < 3) return 'Name is too short';
    if (field === 'jobTitle' && value.length < 2) return 'Job Title is too short';
    if (field === 'phone' && value.replace(/\D/g, '').length < 10) return 'Invalid phone number (min 10 digits)';
    
    if (field === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return 'Please enter a valid email address';
    }
    
    if (field === 'website') {
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlPattern.test(value)) return 'Please enter a valid website URL (e.g., https://example.com)';
      if (!value.startsWith('http')) return 'URL should start with http:// or https://';
    }
    
    if (field === 'linkedIn') {
      if (!value.includes('linkedin.com/in/')) return 'Must be a valid LinkedIn profile link (e.g., linkedin.com/in/username)';
    }
    
    if (field === 'github') {
      if (!value.includes('github.com/')) return 'Must be a valid GitHub profile link (e.g., github.com/username)';
    }
    
    return '';
  };

  const update = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_PERSONAL', payload: { [field]: value } });
    // Clear error while typing
    if (errors[field]) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string, value: string) => {
    const error = validateField(field, value);
    if (error) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [field]: error }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update('profilePhoto', ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <SectionCard title="Personal Information" description="Tell us about yourself">
        {/* Profile Photo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '2px dashed var(--color-primary)',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(var(--color-primary-rgb), 0.06)',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
          >
            {info.profilePhoto ? (
              <img
                src={info.profilePhoto}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Camera size={24} color="var(--color-primary)" />
            )}
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Profile Photo
            </p>
            <p style={{ fontSize: '12px', color: errors.profilePhoto ? '#ef4444' : 'var(--text-muted)', marginTop: 4 }}>
              {errors.profilePhoto || 'Click to upload. JPG, PNG up to 2MB'}
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 20px' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <InputField
              id="fullName"
              label="Full Name"
              placeholder="e.g. Jane Doe"
              value={info.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              onBlur={(e) => handleBlur('fullName', e.target.value)}
              icon={<User size={15} />}
              error={errors.fullName}
              required
            />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <InputField
              id="jobTitle"
              label="Job Title"
              placeholder="e.g. Senior Software Engineer"
              value={info.jobTitle}
              onChange={(e) => update('jobTitle', e.target.value)}
              onBlur={(e) => handleBlur('jobTitle', e.target.value)}
              icon={<Briefcase size={15} />}
              error={errors.jobTitle}
              required
            />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <InputField
              id="email"
              label="Email Address"
              type="email"
              placeholder="jane@example.com"
              value={info.email}
              onChange={(e) => update('email', e.target.value)}
              onBlur={(e) => handleBlur('email', e.target.value)}
              icon={<Mail size={15} />}
              error={errors.email}
              required
            />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={info.phone}
              onChange={(e) => update('phone', e.target.value)}
              onBlur={(e) => handleBlur('phone', e.target.value)}
              icon={<Phone size={15} />}
              error={errors.phone}
              required
            />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <InputField
              id="address"
              label="Address / Location"
              placeholder="San Francisco, CA"
              value={info.address}
              onChange={(e) => update('address', e.target.value)}
              onBlur={(e) => handleBlur('address', e.target.value)}
              icon={<MapPin size={15} />}
              error={errors.address}
              required
            />
          </div>
          
          <div style={{ gridColumn: 'span 2', height: 1, background: 'var(--border-color)', margin: '8px 0', opacity: 0.5 }} />
          
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <InputField
              id="website"
              label="Portfolio / Website"
              placeholder="https://yoursite.com"
              value={info.website}
              onChange={(e) => update('website', e.target.value)}
              onBlur={(e) => handleBlur('website', e.target.value)}
              icon={<Link2 size={15} />}
              error={errors.website}
            />
            <InputField
              id="linkedIn"
              label="LinkedIn URL"
              placeholder="linkedin.com/in/janedoe"
              value={info.linkedIn}
              onChange={(e) => update('linkedIn', e.target.value)}
              onBlur={(e) => handleBlur('linkedIn', e.target.value)}
              icon={<Share2 size={15} />}
              error={errors.linkedIn}
            />
            <InputField
              id="github"
              label="GitHub URL"
              placeholder="github.com/janedoe"
              value={info.github}
              onChange={(e) => update('github', e.target.value)}
              onBlur={(e) => handleBlur('github', e.target.value)}
              icon={<Code size={15} />}
              error={errors.github}
            />
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}
