import type { ResumeData } from '../types/resume';

// ── Profile 1: Generic Software Engineer Placeholder ──
export const softwareEngineerProfile: ResumeData = {
  personalInfo: {
    fullName: 'ARJUN MEHTA',
    email: 'john.doe@email.com',
    phone: '+1 (123) 456-7890',
    address: 'City, State, Country',
    linkedIn: 'linkedin.com/in/arjunmehta',
    github: 'github.com/arjunmehta',
    profilePhoto: '',
    jobTitle: 'Software Engineer',
    website: 'johndoe.dev',
  },
  summary: 'This is a professional summary of your experience, skills, and career achievements. You can edit this text to describe your background, technical expertise, and what value you bring to prospective employers.',
  education: [
    {
      id: 'se-ed-1',
      degree: 'Master of Science in Computer Science',
      college: 'University Name',
      year: '2016 – 2020',
      grade: 'GPA: 3.8/4.0',
    }
  ],
  workExperience: [
    {
      id: 'se-xp-1',
      company: 'Company Name A',
      role: 'Senior Software Engineer',
      startDate: '2022-06',
      endDate: 'Present',
      current: true,
      description: 'Describe your key responsibilities and achievements in this role.\nHighlight technologies used, projects managed, and processes optimized.\nShow positive impact and business value delivered.',
    },
    {
      id: 'se-xp-2',
      company: 'Company Name B',
      role: 'Software Engineer',
      startDate: '2020-08',
      endDate: '2022-05',
      current: false,
      description: 'Describe your key responsibilities and achievements in this role.\nHighlight technologies used, projects managed, and processes optimized.\nShow positive impact and business value delivered.',
    }
  ],
  skills: [
    'Languages: JavaScript, TypeScript, Python, SQL',
    'Frameworks: React, Node.js, Express, TailwindCSS',
    'Databases: PostgreSQL, MongoDB, Redis',
    'DevOps: Docker, AWS, Git, CI/CD Pipelines',
  ],
  projects: [
    {
      id: 'se-pr-1',
      name: 'Project Name A',
      description: 'Briefly describe the purpose of the project, its core features, and your role in designing and developing it.',
      techStack: 'React, Node.js, PostgreSQL',
      link: 'github.com/johndoe/project-a'
    },
    {
      id: 'se-pr-2',
      name: 'Project Name B',
      description: 'Briefly describe the purpose of the project, its core features, and your role in designing and developing it.',
      techStack: 'TypeScript, Python, AWS',
      link: 'github.com/johndoe/project-b'
    }
  ],
  certifications: [
    {
      id: 'se-cert-1',
      name: 'Certified Professional Developer',
      issuer: 'Certification Body',
      year: '2023',
      link: ''
    }
  ],
  languages: [
    { id: 'se-lang-1', name: 'Language 1', proficiency: 'Native' },
    { id: 'se-lang-2', name: 'Language 2', proficiency: 'Intermediate' }
  ]
};

// ── Profile 2: Lead Product Designer ──
export const uiuxDesignerProfile: ResumeData = {
  personalInfo: {
    fullName: 'ANANYA IYER',
    email: 'sophia.carter@design.co',
    phone: '+1 (555) 024-9182',
    address: 'New York, NY',
    linkedIn: 'linkedin.com/in/sophia-design',
    github: '',
    profilePhoto: '',
    jobTitle: 'Lead Product Designer',
    website: 'sophiacarter.design',
  },
  summary: 'Creative Lead Product Designer with 5+ years crafting intuitive digital experiences across mobile and web. Specializing in user research, wireframing, high-fidelity UI design, and building robust design systems that bridge design and engineering.',
  education: [
    {
      id: 'ds-ed-1',
      degree: 'B.F.A. in Interaction Design',
      college: 'School of Visual Arts, NY',
      year: '2015 – 2019',
      grade: 'Honors Graduate',
    }
  ],
  workExperience: [
    {
      id: 'ds-xp-1',
      company: 'Vivid Studio',
      role: 'Lead Product Designer',
      startDate: '2021-10',
      endDate: 'Present',
      current: true,
      description: 'Oversee product design for a SaaS productivity tool with 500k+ weekly active users. Built unified design system in Figma, raising developer efficiency by 30%. Conducted 50+ user testing sessions to iterate on new core features.',
    },
    {
      id: 'ds-xp-2',
      company: 'PixelKraft',
      role: 'UX/UI Designer',
      startDate: '2019-07',
      endDate: '2021-09',
      current: false,
      description: 'Created user journeys, wireframes, and interactive prototypes for e-commerce and mobile banking clients.',
    }
  ],
  skills: [
    'Design: UI, UX, Wireframing, Prototyping, Storyboarding',
    'Tools: Figma, Adobe Illustrator, Photoshop, After Effects',
    'Research: User Interviews, Usability Testing, A/B Testing',
    'Frontend Basics: HTML, CSS, Figma Tokens',
  ],
  projects: [
    {
      id: 'ds-pr-1',
      name: 'EcoSphere Mobile App Design',
      description: 'Designed an iOS app helping users track their carbon footprint and gamify sustainable habits.',
      techStack: 'Figma, Illustrator, Miro',
      link: 'behance.net/sophia/ecosphere'
    },
    {
      id: 'ds-pr-2',
      name: 'FinTech Dashboard Overhaul',
      description: 'Redesigned a complex transaction ledger for an enterprise payment company, reducing support calls by 45%.',
      techStack: 'Figma, Principle, UserTesting.com',
      link: 'behance.net/sophia/fintech'
    }
  ],
  certifications: [
    {
      id: 'ds-cert-1',
      name: 'Interaction Design Specialist',
      issuer: 'Nielsen Norman Group',
      year: '2022',
      link: ''
    }
  ],
  languages: [
    { id: 'ds-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'ds-lang-2', name: 'French', proficiency: 'Intermediate' }
  ]
};

// ── Profile 3: Senior Data Scientist ──
export const dataScientistProfile: ResumeData = {
  personalInfo: {
    fullName: 'KABIR MEHRA',
    email: 'liam.chen@dataworld.org',
    phone: '+1 (555) 073-1982',
    address: 'Seattle, WA',
    linkedIn: 'linkedin.com/in/liam-chen-data',
    github: 'github.com/liamchen-data',
    profilePhoto: '',
    jobTitle: 'Senior Data Scientist',
    website: 'liamchen.ai',
  },
  summary: 'Data Scientist with 5 years of experience applying ML algorithms, statistical modeling, and deep learning to solve business problems. Expert in Python, SQL, and PySpark, with a proven track record of driving revenue growth through predictive analytics.',
  education: [
    {
      id: 'dt-ed-1',
      degree: 'M.S. in Statistics & Machine Learning',
      college: 'University of Washington',
      year: '2018 – 2020',
      grade: 'Research Assistant',
    },
    {
      id: 'dt-ed-2',
      degree: 'B.S. in Mathematics',
      college: 'UC Berkeley',
      year: '2014 – 2018',
      grade: 'Cum Laude',
    }
  ],
  workExperience: [
    {
      id: 'dt-xp-1',
      company: 'Insight Analytics',
      role: 'Senior Data Scientist',
      startDate: '2021-01',
      endDate: 'Present',
      current: true,
      description: 'Developed user churn models with XGBoost, raising retention by 12% ($1.2M ARR). Designed 80+ A/B tests on search algorithms. Built ETL pipelines in PySpark/Snowflake for 5TB+ daily data.',
    },
    {
      id: 'dt-xp-2',
      company: 'Logix Intelligence',
      role: 'Data Analyst',
      startDate: '2020-04',
      endDate: '2020-12',
      current: false,
      description: 'Built Tableau dashboards for executive KPIs. Wrote complex SQL to clean and analyze marketing campaign data.',
    }
  ],
  skills: [
    'Machine Learning: Regression, Classification, Neural Networks, XGBoost',
    'Languages: Python (Pandas, Scikit-learn, PyTorch), R, SQL, PySpark',
    'Big Data & Cloud: Snowflake, Databricks, Apache Spark, AWS S3',
    'Visualization: Tableau, PowerBI, Matplotlib, Seaborn',
  ],
  projects: [
    {
      id: 'dt-pr-1',
      name: 'Fraud Detection Engine',
      description: 'Anomaly detection model for fraudulent credit card transactions in real-time, reducing false positives by 25%.',
      techStack: 'Python, Scikit-Learn, PySpark, Kafka',
      link: 'github.com/liam/fraud-detector'
    },
    {
      id: 'dt-pr-2',
      name: 'Dynamic Pricing Optimization API',
      description: 'API that calculates optimal item prices for a rental marketplace based on real-time demand and competitor pricing.',
      techStack: 'Python, Flask, AWS Lambda, Redis',
      link: 'github.com/liam/pricing-optimizer'
    }
  ],
  certifications: [
    {
      id: 'dt-cert-1',
      name: 'Google Professional Data Engineer',
      issuer: 'Google Cloud Platform',
      year: '2022',
      link: ''
    }
  ],
  languages: [
    { id: 'dt-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'dt-lang-2', name: 'Mandarin', proficiency: 'Native' }
  ]
};

// ── Profile 4: Senior Product Manager ──
export const productManagerProfile: ResumeData = {
  personalInfo: {
    fullName: 'NEHA GUPTA',
    email: 'maria.rodriguez@pmhub.com',
    phone: '+1 (555) 089-3122',
    address: 'Austin, TX',
    linkedIn: 'linkedin.com/in/maria-rod-pm',
    github: '',
    profilePhoto: '',
    jobTitle: 'Senior Product Manager',
    website: 'mariaproduct.com',
  },
  summary: 'Strategic Product Manager with 7+ years leading cross-functional teams to define, build, and launch mobile and web products. Expert in product strategy, roadmap execution, user-centered design, and metrics-driven optimization.',
  education: [
    {
      id: 'pm-ed-1',
      degree: 'M.B.A. in Product Management',
      college: 'University of Texas at Austin',
      year: '2016 – 2018',
      grade: 'Beta Gamma Sigma Honor Society',
    },
    {
      id: 'pm-ed-2',
      degree: 'B.S. in Management Information Systems',
      college: 'Texas A&M University',
      year: '2011 – 2015',
      grade: '',
    }
  ],
  workExperience: [
    {
      id: 'pm-xp-1',
      company: 'FlowTech Inc.',
      role: 'Senior Product Manager',
      startDate: '2020-09',
      endDate: 'Present',
      current: true,
      description: 'Led product definition for a mobile workspace platform with 2.5M users. Achieved 35% growth in user activation. Managed cross-functional team of 12 using Agile. Negotiated API integrations saving $250k operational costs.',
    },
    {
      id: 'pm-xp-2',
      company: 'ClickFlow SaaS',
      role: 'Product Manager',
      startDate: '2018-06',
      endDate: '2020-08',
      current: false,
      description: 'Owned onboarding optimization, driving a 20% conversion lift. Conducted quantitative analysis with Amplitude and qualitative customer interviews.',
    }
  ],
  skills: [
    'Strategy: Product Lifecycle, Roadmap Planning, GTM, Pricing Models',
    'Methodologies: Agile, Scrum, Kanban, JIRA, Confluence, PRDs',
    'Analytics: SQL, Amplitude, Mixpanel, Google Analytics, A/B Testing',
    'Leadership: Cross-functional, Stakeholder Management, Public Speaking',
  ],
  projects: [
    {
      id: 'pm-pr-1',
      name: 'Launch of Workspace Mobile 2.0',
      description: 'Directed redesign and release of mobile app — handled sprint planning, user stories, and App Store deployment.',
      techStack: 'Jira, Figma, Amplitude, iOS App Store',
      link: ''
    },
    {
      id: 'pm-pr-2',
      name: 'Self-Serve Billing Portal',
      description: 'Integrated Stripe with admin panels to build a self-serve subscription portal, cutting billing support tickets by 60%.',
      techStack: 'Stripe, Confluence, Figma',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'pm-cert-1',
      name: 'Certified Product Manager (CPM)',
      issuer: 'AIPMM',
      year: '2021',
      link: ''
    }
  ],
  languages: [
    { id: 'pm-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'pm-lang-2', name: 'Spanish', proficiency: 'Native' }
  ]
};

// ── Profile 5: Head of Growth Marketing ──
export const marketingSpecialistProfile: ResumeData = {
  personalInfo: {
    fullName: 'AARAV SHARMA',
    email: 'marcus.v@growthlabs.io',
    phone: '+1 (555) 041-8762',
    address: 'Chicago, IL',
    linkedIn: 'linkedin.com/in/marcus-growth',
    github: '',
    profilePhoto: '',
    jobTitle: 'Head of Growth Marketing',
    website: 'marcusvance.com',
  },
  summary: 'Performance marketing professional with 6 years driving user acquisition, content strategy, and brand engagement. Expert in managing six-figure ad budgets across paid channels, optimizing landing pages, and using SEO to generate high-converting inbound leads.',
  education: [
    {
      id: 'mkt-ed-1',
      degree: 'B.A. in Marketing & Communications',
      college: 'Northwestern University',
      year: '2014 – 2018',
      grade: 'President of Marketing Association',
    }
  ],
  workExperience: [
    {
      id: 'mkt-xp-1',
      company: 'GrowthLabs Platform',
      role: 'Head of Growth Marketing',
      startDate: '2022-01',
      endDate: 'Present',
      current: true,
      description: 'Executing multi-channel growth strategy across Google Ads, LinkedIn, and Paid Social. Decreased CAC by 28% while doubling monthly sign-ups. Lead a team of 3 content creators launching monthly SEO landing pages.',
    },
    {
      id: 'mkt-xp-2',
      company: 'BrandScale Co.',
      role: 'Performance Marketing Manager',
      startDate: '2018-09',
      endDate: '2021-12',
      current: false,
      description: 'Managed $120k monthly SEM budget. SEO content calendar increased organic traffic by 150% in 12 months. Automated HubSpot email nurture, raising demo-to-close rates by 8%.',
    }
  ],
  skills: [
    'Acquisition: SEO, Google Ads (SEM), LinkedIn Campaigns, Meta Ads',
    'Tools: HubSpot, Webflow, GA4, Ahrefs, SEMrush',
    'CRO: Landing Page Optimization, Copywriting, A/B Testing, Hotjar',
    'Strategy: Lifecycle Marketing, Budget Allocation, Marketing Attribution',
  ],
  projects: [
    {
      id: 'mkt-pr-1',
      name: 'Organic Search Optimization Case Study',
      description: 'Ranked SaaS keyword top 3 on Google through backlinks and technical SEO — page views grew from 200/mo to 18,000/mo.',
      techStack: 'Ahrefs, Webflow, Search Console',
      link: ''
    },
    {
      id: 'mkt-pr-2',
      name: 'Viral Launch of BrandScale Beta',
      description: 'Coordinated viral waitlist campaign on ProductHunt and newsletters, acquiring 8,500 qualified email signups pre-launch.',
      techStack: 'ProductHunt, HubSpot, Substack',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'mkt-cert-1',
      name: 'Google Analytics Individual Qualification',
      issuer: 'Google LLC',
      year: '2023',
      link: ''
    }
  ],
  languages: [
    { id: 'mkt-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'mkt-lang-2', name: 'German', proficiency: 'Beginner' }
  ]
};

// ── Profile 6: Senior Financial Analyst ──
export const financialAnalystProfile: ResumeData = {
  personalInfo: {
    fullName: 'ROHAN VERMA',
    email: 'david.kim@capitalcorp.net',
    phone: '+1 (555) 091-6782',
    address: 'Boston, MA',
    linkedIn: 'linkedin.com/in/david-kim-finance',
    github: '',
    profilePhoto: '',
    jobTitle: 'Senior Financial Analyst',
    website: '',
  },
  summary: 'Detail-oriented Financial Analyst with 5 years in corporate finance, financial modeling, budgeting, and strategic planning. Expert in analyzing complex datasets, identifying cost-saving opportunities, and advising executives on capital allocation.',
  education: [
    {
      id: 'fin-ed-1',
      degree: 'B.S. in Economics & Finance',
      college: 'Boston College',
      year: '2016 – 2020',
      grade: 'Summa Cum Laude, GPA: 3.9',
    }
  ],
  workExperience: [
    {
      id: 'fin-xp-1',
      company: 'Apex Capital Partners',
      role: 'Senior Financial Analyst',
      startDate: '2022-08',
      endDate: 'Present',
      current: true,
      description: 'Developed dynamic financial forecast models (Three-Statement, DCF, LBO) for long-term corporate strategy. Coordinated $40M annual budget across 6 departments. Led financial evaluation for two potential acquisitions.',
    },
    {
      id: 'fin-xp-2',
      company: 'Vanguard Enterprise',
      role: 'Financial Analyst',
      startDate: '2020-06',
      endDate: '2022-07',
      current: false,
      description: 'Analyzed weekly cash flow and reported variances. Built database models in Excel and SQL to analyze LTV and profit margins per product line.',
    }
  ],
  skills: [
    'Finance: Financial Modeling, DCF & LBO Valuations, Budgeting, Forecasting',
    'Tools: MS Excel (VBA, PowerQuery), SQL, Python, Bloomberg Terminal',
    'Reporting: Variance Analysis, Board Presentations, KPI Dashboards',
    'Strategy: Cost-Benefit Analysis, Capital Allocation, Market Due Diligence',
  ],
  projects: [
    {
      id: 'fin-pr-1',
      name: 'Departmental Expense Automation',
      description: 'Replaced manual expense spreadsheets with automated PowerQuery flows, reducing month-end close time by 4 business days.',
      techStack: 'Excel PowerQuery, PowerBI, SQL',
      link: ''
    },
    {
      id: 'fin-pr-2',
      name: 'M&A Deal Modeling – Project Orion',
      description: 'Built comprehensive valuation and synergy models for a $15M logistics competitor acquisition.',
      techStack: 'Excel, PowerPoint',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'fin-cert-1',
      name: 'CFA Level II Candidate',
      issuer: 'CFA Institute',
      year: '2024',
      link: ''
    }
  ],
  languages: [
    { id: 'fin-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'fin-lang-2', name: 'Korean', proficiency: 'Native' }
  ]
};

// ── Profile 7: Senior DevOps Architect ──
export const devopsEngineerProfile: ResumeData = {
  personalInfo: {
    fullName: 'VIKRAM MALHOTRA',
    email: 'vikram.m@cloudsys.net',
    phone: '+91 98123-45678',
    address: 'Bangalore, India',
    linkedIn: 'linkedin.com/in/vikram-devops',
    github: 'github.com/vikram-malhotra',
    profilePhoto: '',
    jobTitle: 'Senior Infrastructure & DevOps Architect',
    website: 'cloudsys.net/~vikram',
  },
  summary: 'Infrastructure Engineer with 8 years specializing in automated provisioning, cloud migration, containerized deployment, and high-availability systems. Deep expertise in AWS, Kubernetes, Terraform, and CI/CD pipelines. Advocate of Infrastructure as Code and DevSecOps.',
  education: [
    {
      id: 'dev-ed-1',
      degree: 'B.Tech in Information Technology',
      college: 'IIIT Bangalore',
      year: '2013 – 2017',
      grade: 'Distinction',
    }
  ],
  workExperience: [
    {
      id: 'dev-xp-1',
      company: 'Optima Cloud Systems',
      role: 'Senior DevOps Architect',
      startDate: '2021-03',
      endDate: 'Present',
      current: true,
      description: 'Designed AWS landing zones with Terraform at 99.99% uptime. Migrated monolith to AWS EKS, cutting compute costs by 35% and scaling speed by 800%. Engineered centralized log management with ELK Stack.',
    },
    {
      id: 'dev-xp-2',
      company: 'Infoserv Technology',
      role: 'DevOps Engineer',
      startDate: '2017-07',
      endDate: '2021-02',
      current: false,
      description: 'Managed GitLab CI/CD pipelines for 15+ repositories. Implemented automated vulnerability scanning in container builds.',
    }
  ],
  skills: [
    'Cloud: AWS (IAM, VPC, EKS, RDS, Route53, CloudWatch), GCP',
    'Containers: Kubernetes, Docker, Helm, Containerd',
    'IaC: Terraform, Ansible, CloudFormation',
    'CI/CD: GitLab CI, Jenkins, GitHub Actions, Bash, Python, Go',
    'Monitoring: Prometheus, Grafana, ELK Stack, HashiCorp Vault',
  ],
  projects: [
    {
      id: 'dev-pr-1',
      name: 'Zero-Downtime EKS Migration',
      description: 'Led migration of active customer database and web portals from EC2 to AWS EKS with zero user impact.',
      techStack: 'Kubernetes, Terraform, AWS DMS, Route53',
      link: ''
    },
    {
      id: 'dev-pr-2',
      name: 'Open-Source Terraform Compliance Tool',
      description: 'Static analysis tool that checks Terraform configs for cloud security vulnerabilities and IAM policy violations.',
      techStack: 'Go, HCL Parser, GitHub Actions',
      link: 'github.com/vikram/tf-audit'
    }
  ],
  certifications: [
    {
      id: 'dev-cert-1',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'The Linux Foundation',
      year: '2022',
      link: ''
    }
  ],
  languages: [
    { id: 'dev-lang-1', name: 'English', proficiency: 'Advanced' },
    { id: 'dev-lang-2', name: 'Hindi', proficiency: 'Native' }
  ]
};

// ── Profile 8: Enterprise Sales Executive ──
export const salesManagerProfile: ResumeData = {
  personalInfo: {
    fullName: 'RITIKA SEN',
    email: 'sarah.j@enterprise-sales.org',
    phone: '+1 (555) 038-4912',
    address: 'Denver, CO',
    linkedIn: 'linkedin.com/in/sarah-j-sales',
    github: '',
    profilePhoto: '',
    jobTitle: 'Enterprise Account Executive',
    website: '',
  },
  summary: 'Results-driven Enterprise Account Executive with 6 years selling SaaS platforms to Fortune 500 corporations. Expert in managing complex sales cycles, negotiating high-value deals, and consistently exceeding annual quotas.',
  education: [
    {
      id: 'sl-ed-1',
      degree: 'B.S. in Business Administration',
      college: 'University of Colorado Boulder',
      year: '2015 – 2019',
      grade: "Dean's List",
    }
  ],
  workExperience: [
    {
      id: 'sl-xp-1',
      company: 'CloudMetrics Inc.',
      role: 'Enterprise Account Executive',
      startDate: '2022-02',
      endDate: 'Present',
      current: true,
      description: 'Managed enterprise accounts ($100k+ ACV). Exceeded 2023 quota by 130%, generating $2.4M in new business. Cultivated C-level relationships in banking, healthcare, and retail sectors.',
    },
    {
      id: 'sl-xp-2',
      company: 'CoreStack Software',
      role: 'Mid-Market Account Executive',
      startDate: '2019-06',
      endDate: '2022-01',
      current: false,
      description: 'Averaged 110% of quarterly quotas. Handled outbound prospecting, lead qualification, and product demos. Managed deals in Salesforce CRM.',
    }
  ],
  skills: [
    'Sales: Enterprise B2B, Account Management, Value-Based Selling',
    'Negotiation: Contract Negotiation, Pricing Strategies, RFP Responses',
    'Tools: Salesforce CRM, Outreach.io, ZoomInfo, LinkedIn Sales Navigator',
    'Communication: Executive Presentations, Relationship Building',
  ],
  projects: [
    {
      id: 'sl-pr-1',
      name: 'Western Region Sales Strategy',
      description: 'Developed account planning playbook for Western US, increasing qualified pipeline value by 40% in 6 months.',
      techStack: 'Salesforce, Excel',
      link: ''
    },
    {
      id: 'sl-pr-2',
      name: 'Key Account Expansion – Orion Health',
      description: 'Led expansion deal growing active users from 400 to 3,500 and increasing account revenue by 250% ($450k ARR).',
      techStack: 'Salesforce, PowerPoint',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'sl-cert-1',
      name: 'MEDDPICC Masterclass Certificate',
      issuer: 'Force Management',
      year: '2023',
      link: ''
    }
  ],
  languages: [
    { id: 'sl-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'sl-lang-2', name: 'French', proficiency: 'Beginner' }
  ]
};

// ── Profile 9: Cybersecurity Engineer ──
export const cybersecurityProfile: ResumeData = {
  personalInfo: {
    fullName: 'ADITYA ROY',
    email: 'ryan.hayes@secureops.io',
    phone: '+1 (555) 062-3391',
    address: 'Washington, D.C.',
    linkedIn: 'linkedin.com/in/ryan-hayes-sec',
    github: 'github.com/rhayes-sec',
    profilePhoto: '',
    jobTitle: 'Senior Cybersecurity Engineer',
    website: '',
  },
  summary: 'Cybersecurity Engineer with 7 years securing enterprise networks and cloud infrastructure. Expert in threat detection, penetration testing, SIEM/SOAR platforms, and Zero Trust architecture. Track record of reducing incident response times by 60% through automation.',
  education: [
    {
      id: 'cs-ed-1',
      degree: 'M.S. in Cybersecurity',
      college: 'George Mason University',
      year: '2016 – 2018',
      grade: 'GPA: 3.9/4.0',
    },
    {
      id: 'cs-ed-2',
      degree: 'B.S. in Computer Science',
      college: 'Virginia Tech',
      year: '2012 – 2016',
      grade: '',
    }
  ],
  workExperience: [
    {
      id: 'cs-xp-1',
      company: 'SecureOps Federal',
      role: 'Senior Cybersecurity Engineer',
      startDate: '2021-04',
      endDate: 'Present',
      current: true,
      description: 'Designed Zero Trust network architecture for 3 federal agencies. Reduced MTTD from 72h to 4h using Splunk SIEM automation. Led red team exercises that identified 120+ critical vulnerabilities, all remediated within 30 days.',
    },
    {
      id: 'cs-xp-2',
      company: 'CyberShield Inc.',
      role: 'Security Operations Analyst',
      startDate: '2018-07',
      endDate: '2021-03',
      current: false,
      description: 'Monitored and triaged 200+ security alerts daily. Deployed Palo Alto next-gen firewalls. Conducted quarterly phishing simulation campaigns.',
    }
  ],
  skills: [
    'Security: Penetration Testing, Threat Hunting, SIEM/SOAR, Incident Response',
    'Frameworks: NIST CSF, MITRE ATT&CK, ISO 27001, FedRAMP, Zero Trust',
    'Tools: Splunk, CrowdStrike, Palo Alto, Burp Suite, Metasploit, Wireshark',
    'Cloud Security: AWS GuardDuty, Azure Sentinel, GCP Security Command Center',
  ],
  projects: [
    {
      id: 'cs-pr-1',
      name: 'Automated Threat Intelligence Pipeline',
      description: 'Built ingestion pipeline for STIX/TAXII threat feeds into Splunk SIEM, cutting false positive alerts by 35%.',
      techStack: 'Python, Splunk, TAXII, AWS Lambda',
      link: 'github.com/ryan/threat-pipeline'
    },
    {
      id: 'cs-pr-2',
      name: 'Zero Trust Implementation Playbook',
      description: 'Authored agency-wide Zero Trust policy and technical control playbook adopted by 3 government departments.',
      techStack: 'Zscaler, Okta, Microsoft Entra ID',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'cs-cert-1',
      name: 'Certified Information Systems Security Professional (CISSP)',
      issuer: 'ISC²',
      year: '2022',
      link: ''
    },
    {
      id: 'cs-cert-2',
      name: 'Offensive Security Certified Professional (OSCP)',
      issuer: 'Offensive Security',
      year: '2021',
      link: ''
    }
  ],
  languages: [
    { id: 'cs-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'cs-lang-2', name: 'Arabic', proficiency: 'Intermediate' }
  ]
};

// ── Profile 10: Healthcare / Medical Professional ──
export const healthcareProfessionalProfile: ResumeData = {
  personalInfo: {
    fullName: 'DR. PRIYA NAIR',
    email: 'priya.nair@medcarehospital.org',
    phone: '+91 90000-11122',
    address: 'Mumbai, India',
    linkedIn: 'linkedin.com/in/dr-priya-nair',
    github: '',
    profilePhoto: '',
    jobTitle: 'Consultant Cardiologist',
    website: '',
  },
  summary: 'Board-certified Cardiologist with 10+ years of clinical experience in interventional cardiology, heart failure management, and preventive cardiology. Published researcher with 15+ peer-reviewed papers and strong background in medical education and patient-centered care.',
  education: [
    {
      id: 'hc-ed-1',
      degree: 'DM in Cardiology',
      college: 'All India Institute of Medical Sciences (AIIMS), Delhi',
      year: '2016 – 2019',
      grade: 'Gold Medalist',
    },
    {
      id: 'hc-ed-2',
      degree: 'MD in Internal Medicine',
      college: 'Grant Medical College, Mumbai',
      year: '2011 – 2014',
      grade: '',
    },
    {
      id: 'hc-ed-3',
      degree: 'MBBS',
      college: 'Seth GS Medical College, Mumbai',
      year: '2005 – 2011',
      grade: 'First Class Distinction',
    }
  ],
  workExperience: [
    {
      id: 'hc-xp-1',
      company: 'Kokilaben Dhirubhai Ambani Hospital',
      role: 'Consultant Cardiologist',
      startDate: '2019-08',
      endDate: 'Present',
      current: true,
      description: 'Perform 150+ cardiac catheterizations annually. Established a multidisciplinary heart failure clinic reducing readmissions by 28%. Lead weekly grand rounds and mentor cardiology fellows. Published 6 research papers on coronary artery disease.',
    },
    {
      id: 'hc-xp-2',
      company: 'Tata Memorial Hospital',
      role: 'Senior Resident – Cardiology',
      startDate: '2016-07',
      endDate: '2019-07',
      current: false,
      description: 'Managed ICU and CCU care for critically ill cardiac patients. Performed echocardiograms, stress tests, and Holter monitoring. Completed DM thesis on LV dysfunction outcomes.',
    }
  ],
  skills: [
    'Clinical: Interventional Cardiology, Echocardiography, Cardiac Catheterization',
    'Diagnostics: ECG, Stress Testing, Holter Monitoring, Cardiac MRI',
    'Research: Clinical Trials (GCP), Biostatistics, Systematic Reviews',
    'Management: Team Leadership, Medical Education, Quality Improvement',
  ],
  projects: [
    {
      id: 'hc-pr-1',
      name: 'Heart Failure Prevention Program',
      description: 'Designed a structured 6-month follow-up protocol for post-MI patients, reducing 30-day readmission rate from 18% to 13%.',
      techStack: 'REDCap, SPSS, HIS Integration',
      link: ''
    },
    {
      id: 'hc-pr-2',
      name: 'Cardiac Care Telemedicine Initiative',
      description: 'Launched telecardiology service during COVID-19 lockdown, conducting 500+ remote consultations in 3 months.',
      techStack: 'Teladoc, WhatsApp Health, Microsoft Teams',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'hc-cert-1',
      name: 'Fellow of the Indian College of Cardiology (FICC)',
      issuer: 'Indian College of Cardiology',
      year: '2020',
      link: ''
    },
    {
      id: 'hc-cert-2',
      name: 'Basic Life Support (BLS) Instructor',
      issuer: 'American Heart Association',
      year: '2021',
      link: ''
    }
  ],
  languages: [
    { id: 'hc-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'hc-lang-2', name: 'Hindi', proficiency: 'Native' },
    { id: 'hc-lang-3', name: 'Marathi', proficiency: 'Native' }
  ]
};

// ── Profile 11: Machine Learning Engineer ──
export const mlEngineerProfile: ResumeData = {
  personalInfo: {
    fullName: 'AMITABH BOSE',
    email: 'james.nakamura@aiventure.tech',
    phone: '+1 (555) 047-9921',
    address: 'San Jose, CA',
    linkedIn: 'linkedin.com/in/james-naka-ml',
    github: 'github.com/jamesnaka-ai',
    profilePhoto: '',
    jobTitle: 'Senior Machine Learning Engineer',
    website: 'jamesnakamura.ai',
  },
  summary: 'Machine Learning Engineer with 5 years building production-grade ML systems and LLM-powered applications. Expert in transformer architectures, MLOps, and deploying high-throughput inference APIs that serve millions of users. Passionate about responsible AI and model interpretability.',
  education: [
    {
      id: 'ml-ed-1',
      degree: 'M.S. in Artificial Intelligence',
      college: 'Carnegie Mellon University',
      year: '2018 – 2020',
      grade: 'Dean\'s Fellowship Recipient',
    },
    {
      id: 'ml-ed-2',
      degree: 'B.S. in Electrical Engineering',
      college: 'UC San Diego',
      year: '2014 – 2018',
      grade: 'Magna Cum Laude',
    }
  ],
  workExperience: [
    {
      id: 'ml-xp-1',
      company: 'AI Venture Labs',
      role: 'Senior ML Engineer',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description: 'Fine-tuned and deployed LLMs (GPT-4, LLaMA-3) for enterprise document intelligence, achieving 89% accuracy on client NER benchmarks. Built distributed training pipeline on AWS SageMaker for models with 13B+ parameters. Reduced inference latency by 3× using TensorRT quantization.',
    },
    {
      id: 'ml-xp-2',
      company: 'DataMind Inc.',
      role: 'Machine Learning Engineer',
      startDate: '2020-07',
      endDate: '2022-02',
      current: false,
      description: 'Built recommendation engine serving 4M daily active users using collaborative filtering and contextual bandits. Implemented automated retraining pipelines using Apache Airflow and MLflow.',
    }
  ],
  skills: [
    'ML & DL: Transformers, CNNs, GANs, RL, NLP, Computer Vision',
    'Frameworks: PyTorch, TensorFlow, HuggingFace, LangChain, Scikit-learn',
    'MLOps: SageMaker, MLflow, DVC, Airflow, Docker, Kubernetes',
    'Languages: Python, C++, CUDA, SQL, Bash',
  ],
  projects: [
    {
      id: 'ml-pr-1',
      name: 'Medical Imaging Diagnosis AI',
      description: 'Developed CNN model to detect diabetic retinopathy from fundus images — 94.2% AUC on clinical validation set.',
      techStack: 'PyTorch, ResNet-50, AWS SageMaker, OpenCV',
      link: 'github.com/james/retina-ai'
    },
    {
      id: 'ml-pr-2',
      name: 'Real-time Multilingual Chatbot',
      description: 'Built LLM-powered customer support bot supporting 12 languages with <200ms response time for 500K daily queries.',
      techStack: 'LangChain, GPT-4, Redis, FastAPI, Kubernetes',
      link: 'github.com/james/multibot'
    }
  ],
  certifications: [
    {
      id: 'ml-cert-1',
      name: 'AWS Certified Machine Learning – Specialty',
      issuer: 'Amazon Web Services',
      year: '2023',
      link: ''
    }
  ],
  languages: [
    { id: 'ml-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'ml-lang-2', name: 'Japanese', proficiency: 'Intermediate' }
  ]
};

// ── Profile 12: HR & Talent Acquisition Manager ──
export const hrManagerProfile: ResumeData = {
  personalInfo: {
    fullName: 'MEGHA SHARMA',
    email: 'claire.m@peoplefirst.hr',
    phone: '+1 (555) 056-7743',
    address: 'Seattle, WA',
    linkedIn: 'linkedin.com/in/claire-montague-hr',
    github: '',
    profilePhoto: '',
    jobTitle: 'Senior HR & Talent Acquisition Manager',
    website: '',
  },
  summary: 'Strategic HR professional with 8 years building high-performing teams and cultures at fast-growing technology companies. Expertise in full-cycle recruiting, organizational design, employee engagement, HRBP partnerships, and DEI program development.',
  education: [
    {
      id: 'hr-ed-1',
      degree: 'M.A. in Organizational Psychology',
      college: 'University of Washington',
      year: '2014 – 2016',
      grade: '',
    },
    {
      id: 'hr-ed-2',
      degree: 'B.S. in Human Resource Management',
      college: 'Purdue University',
      year: '2010 – 2014',
      grade: 'Cum Laude',
    }
  ],
  workExperience: [
    {
      id: 'hr-xp-1',
      company: 'NovaTech Platforms',
      role: 'Senior HR & Talent Manager',
      startDate: '2020-05',
      endDate: 'Present',
      current: true,
      description: 'Scaled engineering and product teams from 80 to 300 employees in 18 months. Reduced time-to-fill from 62 to 34 days by redesigning sourcing strategy. Built DEI hiring program increasing underrepresented talent by 40%. Facilitated 200+ annual performance reviews.',
    },
    {
      id: 'hr-xp-2',
      company: 'BrightPath Consulting',
      role: 'HR Business Partner',
      startDate: '2016-09',
      endDate: '2020-04',
      current: false,
      description: 'Partnered with C-suite on workforce planning for 500-person consultancy. Rolled out employee engagement survey, achieving 82% participation. Managed full-cycle recruitment for 80+ roles annually.',
    }
  ],
  skills: [
    'Talent Acquisition: Full-Cycle Recruiting, Technical Hiring, Executive Search',
    'HRBP: Org Design, Workforce Planning, Performance Management, ER',
    'DEI: Program Design, Inclusive Sourcing, Bias Training, ERG Leadership',
    'Tools: Greenhouse ATS, Workday, LinkedIn Recruiter, BambooHR',
  ],
  projects: [
    {
      id: 'hr-pr-1',
      name: 'Engineering Hiring Revamp',
      description: 'Redesigned take-home assessment and interview process, cutting hiring cycle by 40% while improving offer acceptance rate from 65% to 82%.',
      techStack: 'Greenhouse, Calendly, HackerRank',
      link: ''
    },
    {
      id: 'hr-pr-2',
      name: 'Remote Work Policy Framework',
      description: 'Authored company-wide hybrid work policy adopted across 4 offices, rated 4.7/5 by employees in post-launch survey.',
      techStack: 'Workday, Notion, Microsoft Forms',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'hr-cert-1',
      name: 'Senior Professional in Human Resources (SPHR)',
      issuer: 'HRCI',
      year: '2021',
      link: ''
    }
  ],
  languages: [
    { id: 'hr-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'hr-lang-2', name: 'Spanish', proficiency: 'Intermediate' }
  ]
};

// ── Profile 13: Architecture / Civil Engineer ──
export const civilEngineerProfile: ResumeData = {
  personalInfo: {
    fullName: 'ISHAN VERMA',
    email: 'ethan.brooks@structuralpros.com',
    phone: '+1 (555) 013-8845',
    address: 'Houston, TX',
    linkedIn: 'linkedin.com/in/ethan-brooks-civil',
    github: '',
    profilePhoto: '',
    jobTitle: 'Senior Structural Engineer',
    website: '',
  },
  summary: 'Licensed Structural Engineer (PE) with 9 years of experience in the design and analysis of commercial, industrial, and residential structures. Proven expertise in leading multi-discipline project teams, BIM workflows, and delivering projects on time and under budget.',
  education: [
    {
      id: 'ce-ed-1',
      degree: 'M.S. in Structural Engineering',
      college: 'University of Texas at Austin',
      year: '2014 – 2016',
      grade: 'GPA: 3.85/4.0',
    },
    {
      id: 'ce-ed-2',
      degree: 'B.S. in Civil Engineering',
      college: 'Texas A&M University',
      year: '2010 – 2014',
      grade: '',
    }
  ],
  workExperience: [
    {
      id: 'ce-xp-1',
      company: 'Morrison & Hall Structural',
      role: 'Senior Structural Engineer',
      startDate: '2020-01',
      endDate: 'Present',
      current: true,
      description: 'Led structural design for 5 high-rise mixed-use towers (up to 42 stories) worth $1.2B. Managed BIM coordination across architectural, MEP, and civil disciplines. Achieved LEED Gold certification on 3 projects through materials optimization.',
    },
    {
      id: 'ce-xp-2',
      company: 'Halcrow Engineering',
      role: 'Structural Engineer',
      startDate: '2016-06',
      endDate: '2019-12',
      current: false,
      description: 'Designed foundations, floor systems, and lateral load resisting systems for industrial facilities. Prepared structural calculations, drawings, and specifications for permit submissions.',
    }
  ],
  skills: [
    'Structural: Concrete, Steel, Timber, Masonry Design — AISC, ACI, IBC',
    'Software: ETABS, SAP2000, RAM Structural System, AutoCAD, Revit (BIM)',
    'Analysis: Seismic, Wind, Foundation, Lateral System Analysis',
    'Project Management: Budget Control, Schedule, Client Communication',
  ],
  projects: [
    {
      id: 'ce-pr-1',
      name: 'Houston Medical Tower (42 Floors)',
      description: 'Lead structural engineer for a $450M, 42-story concrete shear wall hospital tower — on schedule and $2M under budget.',
      techStack: 'ETABS, Revit, AutoCAD',
      link: ''
    },
    {
      id: 'ce-pr-2',
      name: 'Refinery Expansion – Beaumont, TX',
      description: 'Designed structural steel framing for 3 new process buildings and elevated pipe racks for an oil refinery expansion project.',
      techStack: 'SAP2000, AutoCAD, RAM',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'ce-cert-1',
      name: 'Professional Engineer (PE) – Texas',
      issuer: 'Texas Board of Professional Engineers',
      year: '2019',
      link: ''
    }
  ],
  languages: [
    { id: 'ce-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'ce-lang-2', name: 'Spanish', proficiency: 'Beginner' }
  ]
};

// ── Profile 14: Frontend / React Developer ──
export const frontendDeveloperProfile: ResumeData = {
  personalInfo: {
    fullName: 'NIDHI SINGH',
    email: 'nina.walsh@webcraft.dev',
    phone: '+1 (555) 022-6604',
    address: 'Portland, OR',
    linkedIn: 'linkedin.com/in/nina-walsh-dev',
    github: 'github.com/ninawalsh',
    profilePhoto: '',
    jobTitle: 'Senior Frontend Engineer',
    website: 'ninawalsh.dev',
  },
  summary: 'Creative Frontend Engineer with 5 years building pixel-perfect, performant web experiences. Specialist in React, TypeScript, and design systems, with a deep passion for accessibility, web animations, and crafting UI that delights users. Open source contributor with 800+ GitHub stars.',
  education: [
    {
      id: 'fe-ed-1',
      degree: 'B.S. in Human-Computer Interaction',
      college: 'Oregon State University',
      year: '2016 – 2020',
      grade: 'Valedictorian',
    }
  ],
  workExperience: [
    {
      id: 'fe-xp-1',
      company: 'Webcraft Studios',
      role: 'Senior Frontend Engineer',
      startDate: '2022-04',
      endDate: 'Present',
      current: true,
      description: 'Built and maintained a component library (50+ components) used by 8 teams across the org. Reduced Core Web Vitals LCP from 4.2s to 1.1s through lazy loading and code splitting. Mentored 3 junior engineers and established frontend coding standards.',
    },
    {
      id: 'fe-xp-2',
      company: 'CreativeLab Agency',
      role: 'Frontend Developer',
      startDate: '2020-06',
      endDate: '2022-03',
      current: false,
      description: 'Developed award-winning marketing sites for 20+ clients using Next.js, Framer Motion, and Three.js. Implemented accessibility audit process achieving WCAG 2.1 AA compliance across all projects.',
    }
  ],
  skills: [
    'Core: React, TypeScript, Next.js, Vue.js, Svelte, HTML5, CSS3',
    'Animation: Framer Motion, GSAP, Three.js, CSS Animations',
    'State Management: Redux Toolkit, Zustand, React Query, Jotai',
    'Testing & Build: Vitest, Playwright, Webpack, Vite, Turborepo',
  ],
  projects: [
    {
      id: 'fe-pr-1',
      name: 'Open Source UI Component Library',
      description: 'Built a headless, accessible component library in React with 50+ components, 800+ GitHub stars, and 2,000+ weekly npm downloads.',
      techStack: 'React, TypeScript, Radix UI, Storybook, Vitest',
      link: 'github.com/nina/uikit'
    },
    {
      id: 'fe-pr-2',
      name: 'Interactive Data Visualization Dashboard',
      description: 'Real-time financial data dashboard with animated D3.js charts, dark/light mode, and full keyboard navigation support.',
      techStack: 'React, D3.js, TypeScript, Recharts, TailwindCSS',
      link: 'github.com/nina/dashboard'
    }
  ],
  certifications: [
    {
      id: 'fe-cert-1',
      name: 'Google UX Design Professional Certificate',
      issuer: 'Google / Coursera',
      year: '2022',
      link: ''
    }
  ],
  languages: [
    { id: 'fe-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'fe-lang-2', name: 'Italian', proficiency: 'Intermediate' }
  ]
};

// ── Profile 15: Operations / Supply Chain Manager ──
export const operationsManagerProfile: ResumeData = {
  personalInfo: {
    fullName: 'DEV KAPOOR',
    email: 'derek.osei@supplychain.co',
    phone: '+1 (555) 033-5500',
    address: 'Atlanta, GA',
    linkedIn: 'linkedin.com/in/derek-osei-ops',
    github: '',
    profilePhoto: '',
    jobTitle: 'Senior Supply Chain & Operations Manager',
    website: '',
  },
  summary: 'Operations and Supply Chain Manager with 10 years of experience optimizing end-to-end supply chains, reducing costs, and improving delivery performance for global manufacturing companies. Six Sigma Black Belt with expertise in demand planning, logistics, and ERP systems.',
  education: [
    {
      id: 'op-ed-1',
      degree: 'M.B.A. in Supply Chain Management',
      college: 'Georgia Tech Scheller College of Business',
      year: '2014 – 2016',
      grade: '',
    },
    {
      id: 'op-ed-2',
      degree: 'B.S. in Industrial Engineering',
      college: 'Georgia Institute of Technology',
      year: '2009 – 2013',
      grade: 'Tau Beta Pi Honor Society',
    }
  ],
  workExperience: [
    {
      id: 'op-xp-1',
      company: 'Apex Manufacturing Corp.',
      role: 'Senior Supply Chain Manager',
      startDate: '2019-08',
      endDate: 'Present',
      current: true,
      description: 'Managed $80M annual procurement portfolio across 12 global suppliers. Reduced inventory holding costs by 22% through demand-sensing forecasting models. Led SAP S/4HANA ERP migration for 6 facilities, completed 2 months ahead of schedule.',
    },
    {
      id: 'op-xp-2',
      company: 'Logistics First Group',
      role: 'Operations Manager',
      startDate: '2016-06',
      endDate: '2019-07',
      current: false,
      description: 'Oversaw 3PL operations for a 250,000 sq ft distribution center. Improved order fulfillment rate from 91% to 98.5%. Applied Six Sigma DMAIC to reduce packaging defects by 30%.',
    }
  ],
  skills: [
    'Supply Chain: Demand Planning, S&OP, Procurement, Inventory Management, 3PL',
    'Methodologies: Lean Manufacturing, Six Sigma Black Belt, Kaizen, DMAIC',
    'ERP: SAP S/4HANA, Oracle SCM, NetSuite, Microsoft Dynamics 365',
    'Analytics: Power BI, Tableau, Excel (Advanced), SQL, Python (Pandas)',
  ],
  projects: [
    {
      id: 'op-pr-1',
      name: 'Global Supplier Risk Dashboard',
      description: 'Built Power BI dashboard consolidating supplier quality, lead times, and geopolitical risk scores — enabling proactive risk mitigation.',
      techStack: 'Power BI, SQL, Python, SAP Data',
      link: ''
    },
    {
      id: 'op-pr-2',
      name: 'End-to-End Freight Cost Reduction',
      description: 'Renegotiated freight contracts and optimized shipping lanes, saving $1.4M annually on outbound logistics.',
      techStack: 'SAP TM, Flexport, Excel',
      link: ''
    }
  ],
  certifications: [
    {
      id: 'op-cert-1',
      name: 'Certified Supply Chain Professional (CSCP)',
      issuer: 'APICS',
      year: '2020',
      link: ''
    },
    {
      id: 'op-cert-2',
      name: 'Six Sigma Black Belt (SSBB)',
      issuer: 'ASQ',
      year: '2018',
      link: ''
    }
  ],
  languages: [
    { id: 'op-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'op-lang-2', name: 'Twi', proficiency: 'Native' },
    { id: 'op-lang-3', name: 'French', proficiency: 'Beginner' }
  ]
};



// ── Profile 17: Jane Smith (Generic Frontend & Power Platform Developer) ──
export const sunehaDeveloperProfile: ResumeData = {
  personalInfo: {
    fullName: 'SUNEHA SHARMA',
    email: 'suneha.sharma@example.com',
    phone: '+1 (555) 019-9823',
    address: 'New York, NY, USA',
    linkedIn: 'linkedin.com/in/sunehasharma',
    github: 'github.com/sunehasharma',
    profilePhoto: '',
    jobTitle: 'Frontend & Power Platform Developer',
    website: 'janesmith.dev',
  },
  summary: 'Frontend Engineer with 1+ years of experience delivering production-grade web applications using React.js, JavaScript (ES6+), and TypeScript. Proven track record of building responsive, component-driven UIs with seamless REST API integration, dynamic data rendering, and a sharp focus on UX quality. Experienced in remote Agile teams, comfortable owning features end-to-end — from design handoff to deployment. Passionate about crafting delightful user interfaces for AI-powered products.',
  education: [
    {
      id: 'suneha-ed-1',
      degree: 'B.Tech in Computer Science Engineering',
      college: 'State Technical University',
      year: '2021 – 2025',
      grade: 'CGPA: 8.78 / 10',
    }
  ],
  workExperience: [
    {
      id: 'suneha-xp-1',
      company: 'AOSC Technologies, Remote',
      role: 'Frontend & Power Platform Developer',
      startDate: '2025-02',
      endDate: 'Present',
      current: true,
      description: 'Built production React.js interfaces with TypeScript for enterprise clients, delivering responsive UIs with dynamic API integration and real-time data mapping.\nEngineered reusable component libraries for dashboards, multi-step forms, and analytical result views — reducing development time across projects by ~30%.\nIntegrated AI-powered agents (PDF conversion, data extraction, automation) directly into the React frontend, improving user workflow efficiency.\nDeveloped and consumed REST APIs with AI integration, handling complex JSON responses and mapping data to structured UI components.\nStreamlined business workflows using Power Apps and Power Automate, reducing manual task overhead for clients.\nCollaborated in a remote Agile environment using Azure DevOps for sprint planning, code reviews, and CI/CD.',
    },
    {
      id: 'suneha-xp-2',
      company: 'AOSC Technologies, Remote',
      role: 'Microsoft Power Platform Intern',
      startDate: '2024-07',
      endDate: '2025-01',
      current: false,
      description: 'Developed and deployed model-driven Power Apps to streamline organizational workflows, including leave requests, approvals, and task management.\nImplemented Power Automate flows for repetitive task automation and real-time notifications, reducing manual effort significantly.\nGained hands-on experience translating business requirements into low-code technical solutions.',
    },
    {
      id: 'suneha-xp-3',
      company: 'Future Finder, Remote',
      role: 'Python Development Intern',
      startDate: '2023-07',
      endDate: '2023-08',
      current: false,
      description: 'Built automation scripts and utility applications in Python, including a voice assistant and command-recognition system.\nDeveloped real-time logic and problem-solving skills through hands-on mini-project development.',
    }
  ],
  skills: [
    'Core Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, Python, SQL',
    'Frontend Frameworks: React.js, Tailwind CSS, Fluent UI, Responsive Web Design, Component Architecture',
    'State & Data: REST APIs, JSON, Local Storage Mapping, Dynamic Data Rendering, Dataverse',
    'Tooling & DevOps: Git, GitHub, Azure DevOps, Postman, Docker, Vercel',
    'AI & Automation: LLM-based Workflows, Prompt Engineering, RAG Systems, AI Agent Integration',
    'Platform: Microsoft Power Platform (Power Apps, Power Automate, Power Pages, Power BI), Azure Functions',
    'Testing: API Testing (Postman), Manual Testing, Browser Debugging Tools',
    'Soft Skills: Remote Collaboration, Agile/Scrum, Problem Solving, Cross-functional Teamwork'
  ],
  projects: [
    {
      id: 'suneha-pr-1',
      name: 'SwitchGate 2 – Tableau to Power BI Converter',
      description: 'Leading end-to-end frontend development of an enterprise-grade Tableau-to-Power-BI migration platform, architecting the full React.js application structure using Tailwind CSS for a scalable, responsive user experience.\nDesigned and built modular UI components for report browsing, migration status tracking, and visualization previews.\nIntegrated multiple backend REST APIs to fetch report data, mapping API responses and local storage state with zero data loss.',
      techStack: 'React.js · TypeScript · Fluent UI · Python · REST APIs · LLM · Azure DevOps',
      link: 'github.com/janesmith/switchgate2'
    },
    {
      id: 'suneha-pr-2',
      name: 'DocQuery AI – PDF-Based Q&A Chatbot',
      description: 'Built a fully offline, privacy-first chatbot allowing users to upload any PDF and receive precise, context-aware answers.\nImplemented a Retrieval-Augmented Generation (RAG) pipeline: chunking, vector store embedding, and semantic retrieval.\nRan open-source models locally, keeping sensitive business document data fully on-device.',
      techStack: 'Python · LLaMA (Ollama) · RAG · Local AI Processing',
      link: 'github.com/janesmith/docquery'
    }
  ],
  certifications: [],
  languages: [
    { id: 'suneha-lang-1', name: 'Remote Collaboration', proficiency: 'Native' },
    { id: 'suneha-lang-2', name: 'Agile / Scrum', proficiency: 'Native' },
    { id: 'suneha-lang-3', name: 'Problem Solving', proficiency: 'Native' }
  ]
};

// ── Profile 18: Robert Johnson (Generic D365 CRM Developer) ──
export const shauryaDeveloperProfile: ResumeData = {
  personalInfo: {
    fullName: 'SHAURYA VERMA',
    email: 'shaurya.verma@example.com',
    phone: '+1 (555) 024-8834',
    address: 'Austin, TX, USA',
    linkedIn: 'linkedin.com/in/shauryaverma',
    github: 'github.com/shauryaverma',
    profilePhoto: '',
    jobTitle: 'Microsoft Dynamics 365 CRM Developer',
    website: 'robertj.dev',
  },
  summary: 'Microsoft-focused developer with 4+ years of hands-on experience across Dynamics 365 CRM, Power Platform, Dataverse, Power Automate, and Azure. Background spans CRM customisation, data integration, business intelligence, and workflow automation across finance, healthcare, and HR industries. Experienced in managing end-to-end enterprise client assignments independently in remote environments.',
  education: [
    {
      id: 'shaurya-ed-1',
      degree: 'B.Voc Web Design & Dev (IT)',
      college: 'DAV Technical College',
      year: '2016 – 2020',
      grade: 'First Division',
    }
  ],
  workExperience: [
    {
      id: 'shaurya-xp-1',
      company: '🏗️  FINANCE & OPERATIONS',
      role: 'Data Integration & Analytics — Microsoft Fabric + Dynamics 365 CRM',
      startDate: '2024-03',
      endDate: 'Present',
      current: true,
      description: 'Engineered a Microsoft Fabric Lakehouse solution unifying Dynamics 365 Sales (CRM), Xero, Stripe, CSV, and Snowflake into a centralised data architecture for real-time financial visibility.\nConfigured D365 CRM data exports via Dataverse connectors and REST APIs to continuously sync Account, Lead, Opportunity, and Invoice entity data into the Fabric Lakehouse.\nBuilt Power Automate flows to trigger Lakehouse ingestion pipelines on Dynamics 365 record creation and update events, enabling near-real-time data freshness across finance and CRM systems.\nDelivered dynamic Power BI dashboards embedded inside Dynamics 365 Sales for live pipeline reporting — giving sales and finance teams unified insight within their CRM workspace.\nLeveraged Dataverse APIs to surface aggregated financial KPIs back into D365 CRM dashboards, enabling sales reps to see account-level revenue context directly in their CRM view.',
    },
    {
      id: 'shaurya-xp-2',
      company: '🏥  HEALTHCARE ANALYTICS',
      role: 'Healthcare Insights System with CRM Patient Tracking',
      startDate: '2023-01',
      endDate: '2024-02',
      current: false,
      description: 'Built a large-scale healthcare analytics system using Microsoft Fabric & Snowflake; integrated Dynamics 365 CRM as the patient and case management layer for structured entity tracking.\nConfigured Power Automate workflows to route anomaly alerts detected in Power BI directly to CRM records, creating automated follow-up tasks in Dynamics 365 for care coordinators.\nEnabled 8-year trend analysis via Power BI dashboards with KPI tracking, anomaly detection, and CRM-linked drill-throughs to individual patient accounts in D365 for deeper case context.\nIntegrated Azure OpenAI to auto-generate insight summaries and trend explanations, with results pushed back to Dynamics 365 CRM record notes via REST API, making AI-generated insights accessible to the entire care team within their CRM.',
    },
    {
      id: 'shaurya-xp-3',
      company: '🌍  GOVERNMENT API INTEGRATION',
      role: 'Seismic Insights Platform with CRM Field Coordination',
      startDate: '2022-02',
      endDate: '2022-12',
      current: false,
      description: 'Built an analytical platform using PySpark in Microsoft Fabric Notebooks for large-scale seismic data processing; integrated Dynamics 365 CRM to manage field response teams and incident records linked to seismic events.\nDeveloped Power Automate flows that translate threshold-breaching seismic events from the government API into CRM incident cases in Dynamics 365, enabling automated alert-to-response workflows.\nCreated Power BI visualisations embedded in Fabric with real-time government API data, and published embedded reports within D365 CRM dashboards for field coordinators\' situational awareness.\nAutomated data refresh schedules ensuring dashboards and D365 CRM incident records always reflect up-to-date seismic readings without manual intervention.',
    },
    {
      id: 'shaurya-xp-4',
      company: '💰  Vendor Management System',
      role: 'Financial Workflow Automation via Dynamics 365 & Power Automate',
      startDate: '2021-03',
      endDate: '2022-01',
      current: false,
      description: 'Built end-to-end Power Automate flows within Dynamics 365 to automate invoice aging notifications, vendor exception alerts, and monthly spend report distribution to finance stakeholders.\nDeveloped Dynamics 365 Sales custom entities and views to track vendor relationships, payment cycles, and budget exceptions — replacing fragmented spreadsheet-based workflows with a structured CRM solution.\nDesigned Power BI reports covering invoice aging, exception tracking, and spend analytics — embedded directly within D365 CRM dashboards for finance team self-service access without leaving their CRM environment.\nEnabled drill-down across cost centres and vendors through Dataverse-backed data models, giving finance stakeholders real-time budget control from within the Dynamics 365 workspace.',
    },
    {
      id: 'shaurya-xp-5',
      company: '👥  HR & PEOPLE ANALYTICS',
      role: 'Recruitment & Onboarding Application — D365 CRM + Power Platform',
      startDate: '2020-08',
      endDate: '2021-02',
      current: false,
      description: 'Built a full recruitment and onboarding application using Dynamics 365 CRM custom modules and Power Apps — tracking candidates from application through onboarding as structured CRM records with complete audit trail.\nConfigured Power Automate workflows to automate recruitment funnel stage transitions — triggering interview scheduling, offer letter generation, and onboarding task assignments automatically in Dynamics 365.\nDelivered Power BI reports for recruitment funnel tracking, time-to-hire metrics, and compliance status — embedded within Dynamics 365 CRM for HR stakeholder self-service visibility without leaving their CRM workspace.\nIntegrated SharePoint with Dynamics 365 CRM for document management — enabling onboarding document storage and compliance tracking linked directly to candidate CRM records for seamless HR operations.',
    }
  ],
  skills: [
    '🔷  Dynamics 365 & Power Platform: Dynamics 365 CRM  ·  Dynamics 365 Sales  ·  Power Automate  ·  Power Apps  ·  Dataverse  ·  SharePoint  ·  REST APIs',
    '📊  Power BI & Data Modeling: Power BI Dashboards  ·  DAX  ·  Data Modeling  ·  KPI Tracking  ·  Anomaly Detection  ·  Embedded Reports in D365',
    '☁️  Azure & Cloud: Azure OpenAI  ·  Microsoft Fabric  ·  Lakehouse  ·  Snowflake  ·  Fabric Pipelines  ·  Copilot for D365',
    '⚙️  Data Engineering: Python  ·  SQL  ·  PySpark  ·  Fabric Notebooks  ·  REST APIs',
    '🔗  CRM & Data Integration: D365 CRM Connectors  ·  Dataverse APIs  ·  Xero  ·  Stripe  ·  CSV / JSON  ·  Government APIs',
    '🧠  AI & Automation: Azure OpenAI  ·  Power Automate Flows  ·  Copilot for D365  ·  Auto Summaries  ·  Trend Analysis'
  ],
  projects: [],
  certifications: [
    {
      id: 'shaurya-cert-1',
      name: 'Microsoft Certified: Power Platform Functional Consultant',
      issuer: 'Microsoft',
      year: '2023',
      link: ''
    },
    {
      id: 'shaurya-cert-2',
      name: 'Dynamics 365 Sales Functional Consultant Associate',
      issuer: 'Microsoft',
      year: '2022',
      link: ''
    }
  ],
  languages: [
    { id: 'shaurya-lang-1', name: 'Finance', proficiency: 'Native' },
    { id: 'shaurya-lang-2', name: 'Healthcare', proficiency: 'Native' },
    { id: 'shaurya-lang-3', name: 'HR', proficiency: 'Native' },
    { id: 'shaurya-lang-4', name: 'Seismic', proficiency: 'Native' }
  ]
};

// ── Profile 16: Michael Brown (Generic Power Platform Developer) ──
export const sohitDeveloperProfile: ResumeData = {
  personalInfo: {
    fullName: 'SOHIT VERMA',
    email: 'sohit.verma@example.com',
    phone: '+91 9876543210',
    address: 'Amritsar, Punjab, India',
    linkedIn: 'linkedin.com/in/sohitverma',
    github: 'github.com/sohitverma',
    profilePhoto: '',
    jobTitle: 'Microsoft Power Platform & Dynamics 365 CRM Developer',
    website: 'sohitverma.dev',
  },
  summary: 'Microsoft Power Platform and Dynamics 365 CRM Developer with 3+ years of experience delivering enterprise business applications, intelligent workflow automation, and AI-powered Copilot solutions. Expert in building scalable digital transformation projects across Healthcare, NDIS, Education, and HR sectors independently in remote environments.',
  education: [],
  workExperience: [
    {
      id: 'sohit-xp-1',
      company: 'Customer Service & Sales Automation Platform',
      role: 'Dynamics 365 CRM Implementation',
      startDate: '2025-02',
      endDate: 'Present',
      current: true,
      description: `Implemented a structured D365 CRM Sales pipeline for lead capture, qualification, and opportunity lifecycle tracking.
Configured Business Process Flows and integrated multi-stage Power Automate Wait & Approval workflows for manager sign-offs.
Extended the standard data model using custom Dataverse entities, automated notifications, and event-driven D365 triggers.`,
    },
    {
      id: 'sohit-xp-2',
      company: 'Clinic Management & Patient Engagement System',
      role: 'Healthcare Sector',
      startDate: '2024-06',
      endDate: '2025-01',
      current: false,
      description: `Designed an end-to-end patient lifecycle system using Dynamics 365 CRM, Power Apps, and secure Power Pages portals.
Automated triage, treatment journeys via CRM Business Process Flows, and built automated SMS/Email appointment reminders.
Enforced healthcare compliance using advanced role-based security models within Dataverse.`,
    },
    {
      id: 'sohit-xp-3',
      company: 'Workforce Scheduling & Care Coordination System',
      role: 'NDIS Operations',
      startDate: '2023-11',
      endDate: '2024-05',
      current: false,
      description: `Built a real-time shift scheduling and availability tracking application for support workers using Power Apps and Power Fx.
Automated workflow escalations using Power Automate Wait conditions and central support document repositories on SharePoint.`,
    },
    {
      id: 'sohit-xp-4',
      company: 'AI-Powered Assessment & Evaluation System',
      role: 'Ed-Tech Platform',
      startDate: '2023-05',
      endDate: '2023-10',
      current: false,
      description: `Developed an automated student evaluation platform leveraging Copilot Studio, Azure OpenAI, and Dataverse workflows.
Engineered intelligent marking scripts providing contextual feedback, linked with real-time performance tracking dashboards in Power BI.`,
    },
    {
      id: 'sohit-xp-5',
      company: 'Enterprise AI Knowledge Assistant & Document Analysis',
      role: 'AI Automation',
      startDate: '2022-11',
      endDate: '2023-04',
      current: false,
      description: `Built an enterprise-level Copilot Agent using Copilot Studio and Azure OpenAI to analyze corporate documents and forms.
Integrated AI Builder for automated data extraction, classification, and continuous compliance mapping with Dataverse and SharePoint.`,
    },
    {
      id: 'sohit-xp-6',
      company: 'Recruitment, Onboarding & Document Compliance Platforms',
      role: 'HR & Operations Automation',
      startDate: '2022-06',
      endDate: '2022-10',
      current: false,
      description: `Created a full-cycle recruitment platform with multi-level automated approval flows, custom tracking, and embedded Power BI analytics.
Automated document compliance audits via AI Builder, mapping document trails and SLA windows with automated escalation triggers.`,
    }
  ],
  skills: [
    'Dynamics & Power Platform: Dynamics 365 CRM, D365 Sales, Business Process Flows, Power Apps, Power Pages, Dataverse, SharePoint',
    'Automation & Workflows: Automated Cloud Flows, Wait & Approval Workflows, Scheduled/Instant Flows, D365 Trigger Flows',
    'AI & Conversational Systems: Copilot Studio, Azure OpenAI, AI Builder, Prompt Engineering, AI Agents, Knowledge Base Systems',
    'Analytics & Base Dev: Power BI, Embedded Dashboards, DAX, Dataverse Reporting, Power Fx, Python, JavaScript, SQL'
  ],
  projects: [],
  certifications: [],
  languages: [
    { id: 'sohit-lang-1', name: 'Low-Code Application Design', proficiency: 'Native' },
    { id: 'sohit-lang-2', name: 'Workflow Automation', proficiency: 'Native' },
    { id: 'sohit-lang-3', name: 'BI Report Integration', proficiency: 'Native' }
  ]
};

export function getDummyDataForTemplate(templateId: string): ResumeData {
  switch (templateId) {

    // ── ATS & Minimalist: Software Engineer (clean, technical content) ──
    case 'ats-classic':
      return softwareEngineerProfile;
    case 'compact-ats':
      return devopsEngineerProfile;
    case 'mono-clean':
      return cybersecurityProfile;
    case 'minimal-lines':
      return frontendDeveloperProfile;
    case 'sky-blue-minimal':
      return mlEngineerProfile;

    // ── Two-Column Modern: Mix of tech & creative ──
    case 'modern-minimal':
      return uiuxDesignerProfile;
    case 'aqua-modern':
      return dataScientistProfile;
    case 'charcoal-modern':
      return devopsEngineerProfile;
    case 'orange-modern':
      return marketingSpecialistProfile;

    // ── Corporate / Executive ──
    case 'corporate-blue':
      return productManagerProfile;
    case 'corporate-pro':
      return financialAnalystProfile;
    case 'executive-dark':
      return salesManagerProfile;
    case 'executive-elite':
      return operationsManagerProfile;
    case 'amber-executive':
      return hrManagerProfile;
    case 'ruby-pro':
      return civilEngineerProfile;

    // ── Dark / Tech Themes ──
    case 'tech-dark':
      return mlEngineerProfile;
    case 'midnight-pro':
      return cybersecurityProfile;
    case 'dark-sidebar':
      return devopsEngineerProfile;

    // ── Purple / Violet Themes ──
    case 'purple-pro':
      return frontendDeveloperProfile;
    case 'violet-pro':
      return uiuxDesignerProfile;

    // ── Bold / Impact ──
    case 'bold-impact':
      return salesManagerProfile;
    case 'crimson-classic':
      return cybersecurityProfile;

    // ── Green / Nature Themes ──
    case 'green-fresh':
      return operationsManagerProfile;
    case 'forest-green':
      return civilEngineerProfile;
    case 'mint-fresh':
      return healthcareProfessionalProfile;

    // ── Elegant / Serif / Classic ──
    case 'elegant-serif':
      return marketingSpecialistProfile;
    case 'elegant-classic':
      return hrManagerProfile;
    case 'rose-gold':
      return uiuxDesignerProfile;

    // ── Timeline / Structured ──
    case 'timeline-clean':
      return softwareEngineerProfile;
    case 'teal-timeline':
      return dataScientistProfile;

    // ── Two-Column Advanced ──
    case 'slate-modern':
      return financialAnalystProfile;
    case 'deep-blue-two-col':
      return mlEngineerProfile;

    // ── Photo Templates ──
    case 'photo-teal':
      return uiuxDesignerProfile;
    case 'photo-navy':
      return productManagerProfile;
    case 'photo-warm':
      return marketingSpecialistProfile;
    case 'photo-split':
      return frontendDeveloperProfile;
    case 'photo-corp-pro':
      return financialAnalystProfile;
    case 'creative-designer':
      return uiuxDesignerProfile;
    case 'photo-rose':
      return hrManagerProfile;
    case 'photo-forest':
      return healthcareProfessionalProfile;
    case 'photo-midnight':
      return cybersecurityProfile;
    case 'photo-violet':
      return frontendDeveloperProfile;
    case 'photo-amber':
      return salesManagerProfile;
    case 'photo-arctic':
      return mlEngineerProfile;
    case 'photo-olive':
      return operationsManagerProfile;
    case 'photo-crimson':
      return civilEngineerProfile;

    // ── AOSC Templates ──
    case 'aosc-nav-v2':
      return softwareEngineerProfile;
    case 'aosc-portfolio':
      return sunehaDeveloperProfile;
    case 'aosc-portfolio-shaurya':
      return shauryaDeveloperProfile;
    case 'aosc-portfolio-sohit':
      return sohitDeveloperProfile;

    // ── Default Fallback ──
    default:
      return softwareEngineerProfile;
  }
}
