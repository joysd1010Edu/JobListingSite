"use client";

//=== Imports ===
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Job, JobApplicationData } from "@/Type/Jobs/Job";

//=== Default Job Listings Data ===
const defaultJobs: Job[] = [
  {
    id: "1",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    category: "Marketing",
    description:
      "Nomad is looking for a Social Media Assistant to help manage and grow our online presence. You will work closely with the marketing team to create engaging content, schedule posts, respond to followers, and analyze social media metrics. The ideal candidate is creative, organized, and passionate about digital marketing.",
    requirements:
      "• 1-2 years of experience in social media management\n• Proficiency with social media platforms (Instagram, Twitter, LinkedIn, TikTok)\n• Experience with scheduling tools like Hootsuite or Buffer\n• Strong written communication skills\n• Ability to work independently and meet deadlines",
    skills:
      "Social Media Marketing, Content Creation, Copywriting, Analytics, Canva, Adobe Creative Suite, Community Management, Hashtag Strategy",
    education:
      "Bachelor's degree in Marketing, Communications, or a related field. Relevant certifications in digital marketing are a plus.",
    benefits:
      "• Competitive salary with performance bonuses\n• Flexible working hours\n• Remote work options\n• Health & dental insurance\n• Annual learning budget of $1,000\n• 25 days paid vacation",
    companyDetails:
      "Nomad is a fast-growing travel technology company based in Paris, France. Founded in 2019, we help remote workers find the best co-working spaces and accommodations worldwide. Our team of 50+ employees spans across 12 countries. We value creativity, autonomy, and work-life balance.",
    salary: "$40,000 - $55,000",
    tags: ["Marketing", "Design"],
    postedDate: "2026-02-25",
    applicants: [
      {
        name: "Alice Martin",
        email: "alice@example.com",
        resumeLink: "https://resume.io/alice",
        coverNote:
          "I am passionate about social media and have 2 years of experience.",
        appliedDate: "2026-02-26",
      },
      {
        name: "Bob Chen",
        email: "bob@example.com",
        resumeLink: "https://resume.io/bob",
        coverNote: "Skilled in content creation and analytics.",
        appliedDate: "2026-02-27",
      },
    ],
  },
  {
    id: "2",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    category: "Design",
    description:
      "Dropbox is looking for a Brand Designer to help shape and evolve our visual identity. You will collaborate with cross-functional teams to create compelling brand experiences across all touchpoints.",
    requirements:
      "• 3+ years of professional brand design experience\n• Strong portfolio showcasing brand identity work\n• Expert-level proficiency in Figma and Adobe Creative Suite\n• Experience creating and maintaining design systems\n• Excellent presentation and communication skills",
    skills:
      "Brand Identity, Typography, Visual Design, Figma, Adobe Illustrator, Adobe Photoshop, Design Systems, Presentation Design, Motion Graphics",
    education:
      "Bachelor's degree in Graphic Design, Visual Communication, or equivalent. MFA preferred but not required.",
    benefits:
      "• Competitive base salary + equity\n• Comprehensive health, dental, and vision coverage\n• $5,000 annual wellness stipend\n• Unlimited PTO policy\n• Home office setup allowance\n• Free Dropbox Plus for life",
    companyDetails:
      "Dropbox is a leading cloud storage and collaboration platform trusted by over 700 million users worldwide. Headquartered in San Francisco, we operate as a Virtual First company, embracing remote work while maintaining collaborative hubs. Our mission is to design a more enlightened way of working.",
    salary: "$65,000 - $85,000",
    tags: ["Design", "Business"],
    postedDate: "2026-02-24",
    applicants: [
      {
        name: "Clara Design",
        email: "clara@example.com",
        resumeLink: "https://portfolio.io/clara",
        coverNote: "6 years in brand design with Fortune 500 clients.",
        appliedDate: "2026-02-25",
      },
    ],
  },
  {
    id: "3",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    category: "Engineering",
    description:
      "Terraform is seeking an Interactive Developer to build immersive web experiences. You will work with designers and stakeholders to create cutting-edge interactive applications using modern frontend frameworks.",
    requirements:
      "• 3+ years of frontend development experience\n• Strong proficiency in React, TypeScript, and Next.js\n• Experience with animation libraries (GSAP, Framer Motion)\n• Knowledge of WebGL or Three.js is a plus\n• Familiarity with CI/CD pipelines and version control (Git)",
    skills:
      "React, TypeScript, Next.js, GSAP, Framer Motion, Three.js, WebGL, HTML5, CSS3, Tailwind CSS, Node.js, Git",
    education:
      "Bachelor's degree in Computer Science, Software Engineering, or related field. Self-taught developers with strong portfolios are also encouraged to apply.",
    benefits:
      "• Relocation assistance available\n• Subsidized public transport pass\n• On-site gym and recreation\n• Quarterly team retreats\n• 30 days paid leave\n• Conference attendance budget",
    companyDetails:
      "Terraform is a creative technology studio based in Hamburg, Germany. We specialize in building award-winning interactive experiences for global brands. Our team of 30 engineers and designers pushes the boundaries of web technology to create memorable digital products.",
    salary: "$70,000 - $90,000",
    tags: ["Developer", "Engineering"],
    postedDate: "2026-02-23",
    applicants: [],
  },
  {
    id: "4",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    category: "Human Resource",
    description:
      "Packer is looking for an HR Manager to lead our human resources operations. You will be responsible for recruitment, employee relations, performance management, and organizational development.",
    requirements:
      "• 5+ years of HR management experience\n• Strong knowledge of Swiss employment law\n• Experience with HRIS systems (e.g., BambooHR, Workday)\n• Proven track record of building positive workplace culture\n• Fluency in English and German",
    skills:
      "Talent Acquisition, Employee Relations, Performance Management, Conflict Resolution, HRIS, Payroll, Compliance, Organizational Development",
    education:
      "Bachelor's degree in Human Resources, Business Administration, or related field. SHRM or CIPD certification preferred.",
    benefits:
      "• Swiss pension plan (BVG)\n• Private health insurance supplement\n• Annual bonus up to 15%\n• Professional development budget\n• Flexible hybrid work model\n• Team building events",
    companyDetails:
      "Packer is a logistics and supply chain management company headquartered in Lucern, Switzerland. With over 200 employees across Europe, we provide end-to-end shipping solutions for e-commerce businesses. Founded in 2015, we pride ourselves on our people-first culture.",
    salary: "$60,000 - $80,000",
    tags: ["Marketing", "Management"],
    postedDate: "2026-02-22",
    applicants: [
      {
        name: "Diana HR",
        email: "diana@example.com",
        resumeLink: "https://resume.io/diana",
        coverNote: "7 years in HR management across EMEA.",
        appliedDate: "2026-02-23",
      },
      {
        name: "Edward Lang",
        email: "edward@example.com",
        resumeLink: "https://resume.io/edward",
        coverNote: "Fluent in English and German, 5 years HR experience.",
        appliedDate: "2026-02-24",
      },
      {
        name: "Fiona Swiss",
        email: "fiona@example.com",
        resumeLink: "https://resume.io/fiona",
        coverNote: "Passionate about people operations.",
        appliedDate: "2026-02-25",
      },
    ],
  },
  {
    id: "5",
    title: "Email Marketing Specialist",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full-Time",
    category: "Marketing",
    description:
      "Revolut is looking for an Email Marketing Specialist to drive engagement through targeted email campaigns. You will be responsible for developing strategies, creating compelling content, and analyzing performance.",
    requirements:
      "• 2+ years of email marketing experience\n• Proficiency with email platforms (Mailchimp, Klaviyo, or HubSpot)\n• Experience with A/B testing and segmentation strategies\n• Strong copywriting and analytical skills\n• Knowledge of GDPR and email compliance",
    skills:
      "Email Marketing, Mailchimp, Klaviyo, HubSpot, A/B Testing, Segmentation, Copywriting, HTML Email, Analytics, GDPR Compliance",
    education:
      "Bachelor's degree in Marketing, Digital Media, or related field. Google Analytics and HubSpot certifications are a plus.",
    benefits:
      "• Stock options\n• Flexible remote-first culture\n• Private health insurance\n• Mental health support\n• Annual team offsite\n• Learning & development budget",
    companyDetails:
      "Revolut is one of the world's fastest-growing fintech companies, serving over 35 million customers globally. Our mission is to build a financial super-app that helps people manage, invest, and transfer money seamlessly. Madrid is one of our key European hubs.",
    salary: "$45,000 - $60,000",
    tags: ["Marketing", "Design"],
    postedDate: "2026-02-21",
    applicants: [],
  },
  {
    id: "6",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full-Time",
    category: "Design",
    description:
      "ClassPass is looking for a Product Designer to help us create intuitive and beautiful user experiences. You will work closely with product managers and engineers to design features from concept to launch.",
    requirements:
      "• 3+ years of product design experience for mobile/web\n• Strong portfolio demonstrating user-centered design thinking\n• Proficiency in Figma and prototyping tools\n• Experience conducting user research and usability testing\n• Ability to work in agile cross-functional teams",
    skills:
      "Product Design, UX/UI, Figma, Prototyping, User Research, Usability Testing, Wireframing, Design Thinking, Interaction Design",
    education:
      "Bachelor's degree in Design, HCI, or related field. Bootcamp graduates with strong portfolios are welcome.",
    benefits:
      "• Free ClassPass membership\n• Competitive salary + equity\n• Private medical & dental\n• Cycle to work scheme\n• 28 days holiday + bank holidays\n• Weekly team lunches",
    companyDetails:
      "ClassPass is the world's leading fitness and wellness membership, connecting members to thousands of studios, gyms, and wellness experiences across 30 countries. Our Manchester office focuses on product innovation for the European market.",
    salary: "$55,000 - $75,000",
    tags: ["Design", "Technology"],
    postedDate: "2026-02-20",
    applicants: [
      {
        name: "Grace UX",
        email: "grace@example.com",
        resumeLink: "https://portfolio.io/grace",
        coverNote: "Product designer with 4 years of mobile app experience.",
        appliedDate: "2026-02-21",
      },
    ],
  },
  {
    id: "7",
    title: "Lead Software Engineer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full-Time",
    category: "Engineering",
    description:
      "Canva is looking for a Lead Software Engineer to help develop and scale our platform. You will lead a team of engineers, architect scalable solutions, and drive technical excellence.",
    requirements:
      "• 6+ years of software engineering experience\n• 2+ years in a technical leadership role\n• Expert-level React, Node.js, and TypeScript\n• Experience with cloud infrastructure (AWS/GCP)\n• Strong system design and architecture skills\n• Experience with mentoring and code reviews",
    skills:
      "React, Node.js, TypeScript, AWS, GCP, System Design, Microservices, PostgreSQL, Redis, Docker, Kubernetes, CI/CD, Technical Leadership",
    education:
      "Bachelor's or Master's degree in Computer Science, Software Engineering, or related field.",
    benefits:
      "• Top-of-market compensation + equity\n• Relocation support to Ontario\n• Comprehensive benefits package\n• $3,000 annual learning & development fund\n• Flexible work schedule\n• Paid parental leave (16 weeks)",
    companyDetails:
      "Canva is a global design platform with over 150 million monthly active users in 190 countries. From presentations to social media posts, Canva empowers everyone to design anything. Our Ontario office is a growing hub of engineering talent building the future of visual communication.",
    salary: "$90,000 - $120,000",
    tags: ["Engineering", "Technology"],
    postedDate: "2026-02-19",
    applicants: [
      {
        name: "Hank Dev",
        email: "hank@example.com",
        resumeLink: "https://github.com/hank",
        coverNote: "8 years in full-stack development, 3 years leading teams.",
        appliedDate: "2026-02-20",
      },
      {
        name: "Iris Code",
        email: "iris@example.com",
        resumeLink: "https://github.com/iris",
        coverNote: "Senior engineer specializing in React and AWS.",
        appliedDate: "2026-02-21",
      },
    ],
  },
  {
    id: "8",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full-Time",
    category: "Technology",
    description:
      "Twitter is looking for a Data Analyst to help drive data-informed decision making. You will analyze large datasets, build dashboards, and provide actionable insights to product and business teams.",
    requirements:
      "• 2+ years of data analysis experience\n• Advanced SQL skills\n• Proficiency with Tableau, Looker, or similar BI tools\n• Experience with Python or R for statistical analysis\n• Strong storytelling and presentation skills",
    skills:
      "SQL, Python, R, Tableau, Looker, Data Visualization, Statistical Analysis, A/B Testing, ETL, BigQuery, Data Storytelling",
    education:
      "Bachelor's degree in Statistics, Mathematics, Computer Science, Economics, or related quantitative field. Master's degree is a plus.",
    benefits:
      "• Competitive salary + RSU grants\n• Comprehensive health coverage\n• Commuter benefits\n• Free meals and snacks\n• Gym membership reimbursement\n• 401(k) with company match",
    companyDetails:
      "Twitter (now X) is one of the world's largest social media platforms, serving hundreds of millions of users globally. Our San Diego office focuses on trust & safety analytics, product analytics, and business intelligence.",
    salary: "$65,000 - $85,000",
    tags: ["Technology", "Business"],
    postedDate: "2026-02-18",
    applicants: [],
  },
  {
    id: "9",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Part-Time",
    category: "Marketing",
    description:
      "GoDaddy is looking for a Brand Strategist to join our marketing team. You will develop and implement brand strategies that resonate with our target audience across Europe.",
    requirements:
      "• 3+ years of brand strategy or marketing experience\n• Strong market research and competitive analysis skills\n• Experience developing brand positioning frameworks\n• Excellent communication and presentation abilities\n• Fluency in English and French",
    skills:
      "Brand Strategy, Market Research, Competitive Analysis, Brand Positioning, Campaign Planning, Storytelling, Consumer Insights, Marketing Analytics",
    education:
      "Bachelor's degree in Marketing, Business, or Communications. MBA or strategic planning certification is a bonus.",
    benefits:
      "• Flexible part-time schedule (20-25 hrs/week)\n• Competitive hourly rate\n• Work from home flexibility\n• Access to GoDaddy's product suite\n• Professional development opportunities",
    companyDetails:
      "GoDaddy is the world's largest domain registrar and web hosting company, empowering everyday entrepreneurs to build their online presence. With over 20 million customers, GoDaddy's Marseille office serves as a creative hub for European marketing efforts.",
    salary: "$35,000 - $50,000",
    tags: ["Marketing", "Business"],
    postedDate: "2026-02-17",
    applicants: [],
  },
  {
    id: "10",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    type: "Remote",
    category: "Design",
    description:
      "Blinklist is looking for a Visual Designer to create stunning visual assets. You will work on a variety of projects including web design, app interfaces, marketing materials, and social media graphics.",
    requirements:
      "• 2+ years of visual/graphic design experience\n• Expert in Figma, Sketch, or Adobe XD\n• Strong attention to detail and pixel-perfect execution\n• Experience collaborating with development teams\n• Portfolio showcasing diverse visual design projects",
    skills:
      "Visual Design, Figma, Sketch, Adobe XD, Adobe Photoshop, Illustration, Icon Design, Design Systems, Responsive Design, Color Theory",
    education:
      "Bachelor's degree in Visual Design, Fine Arts, or Graphic Design. Online certifications or bootcamp graduates are also considered.",
    benefits:
      "• Fully remote position\n• Flexible working hours\n• Monthly co-working space stipend\n• Annual team retreat (all expenses paid)\n• Equipment budget for home office\n• Unlimited PTO",
    companyDetails:
      "Blinklist is a book summary platform that distills key insights from non-fiction bestsellers into 15-minute reads. Based in Granada, Spain, our design team creates the visual language that makes complex ideas accessible and engaging for millions of readers.",
    salary: "$50,000 - $70,000",
    tags: ["Design"],
    postedDate: "2026-02-16",
    applicants: [],
  },
  {
    id: "11",
    title: "Finance Manager",
    company: "Intel",
    location: "Portland, USA",
    type: "Full-Time",
    category: "Finance",
    description:
      "Intel is seeking a Finance Manager to oversee financial planning and analysis. You will manage budgets, forecasting, and financial reporting for the division.",
    requirements:
      "• 5+ years of corporate finance experience\n• CPA or CFA certification required\n• Advanced Excel and financial modeling skills\n• Experience with SAP or Oracle ERP systems\n• Strong analytical and problem-solving abilities\n• Leadership experience managing finance teams",
    skills:
      "Financial Planning, Budgeting, Forecasting, Financial Modeling, SAP, Oracle, Excel, PowerBI, Variance Analysis, Regulatory Compliance, Team Leadership",
    education:
      "Bachelor's degree in Finance, Accounting, or Economics. MBA or Master's in Finance preferred. CPA or CFA designation required.",
    benefits:
      "• Industry-leading salary + annual bonus\n• Comprehensive medical, dental, and vision\n• 401(k) with generous match\n• Employee stock purchase plan\n• On-site fitness center\n• Tuition reimbursement program",
    companyDetails:
      "Intel Corporation is one of the world's largest semiconductor manufacturers, creating technology that shapes the future of computing. Our Portland campus is Intel's global headquarters, home to thousands of engineers and business professionals driving innovation in chip design and manufacturing.",
    salary: "$80,000 - $110,000",
    tags: ["Finance", "Business"],
    postedDate: "2026-02-15",
    applicants: [
      {
        name: "Jack Finance",
        email: "jack@example.com",
        resumeLink: "https://resume.io/jack",
        coverNote: "CFA charterholder with 6 years in corporate finance.",
        appliedDate: "2026-02-16",
      },
    ],
  },
  {
    id: "12",
    title: "Sales Representative",
    company: "Tesla",
    location: "Austin, USA",
    type: "Full-Time",
    category: "Sales",
    description:
      "Tesla is looking for a Sales Representative to join our growing sales team. You will be responsible for engaging with potential customers, conducting product demonstrations, and closing deals.",
    requirements:
      "• 2+ years of B2C or B2B sales experience\n• Proven ability to meet or exceed sales targets\n• Excellent interpersonal and negotiation skills\n• Passion for sustainable energy and electric vehicles\n• Valid driver's license\n• Willingness to work weekends when needed",
    skills:
      "Sales, Negotiation, CRM (Salesforce), Customer Relationship Management, Product Demonstrations, Lead Generation, Closing, Communication",
    education:
      "Bachelor's degree in Business, Marketing, or related field preferred. High school diploma with exceptional sales track record also considered.",
    benefits:
      "• Base salary + uncapped commission\n• Employee vehicle discount program\n• Comprehensive health benefits\n• 401(k) with company match\n• Free Supercharging credits\n• Career growth into management",
    companyDetails:
      "Tesla is accelerating the world's transition to sustainable energy through electric vehicles, solar energy, and integrated renewable energy solutions. Our Austin Gigafactory is one of the largest manufacturing facilities in the world, serving as a hub for production, engineering, and sales operations.",
    salary: "$45,000 - $65,000",
    tags: ["Sales", "Business"],
    postedDate: "2026-02-14",
    applicants: [],
  },
];

//=== Job Context Type ===
interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id" | "postedDate" | "applicants">) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
  applyToJob: (id: string, application: JobApplicationData) => void;
}

//=== Job Context ===
const JobContext = createContext<JobContextType | undefined>(undefined);

//=== Job Provider Component ===
export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>(defaultJobs);

  //=== Add New Job ===
  const addJob = (jobData: Omit<Job, "id" | "postedDate" | "applicants">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date().toISOString().split("T")[0],
      applicants: [],
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  //=== Delete Job ===
  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  //=== Get Job By ID ===
  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  //=== Apply to Job ===
  const applyToJob = (id: string, application: JobApplicationData) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? {
              ...job,
              applicants: [
                ...job.applicants,
                {
                  ...application,
                  appliedDate: new Date().toISOString().split("T")[0],
                },
              ],
            }
          : job,
      ),
    );
  };

  return (
    <JobContext.Provider
      value={{ jobs, addJob, deleteJob, getJobById, applyToJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

//=== Custom Hook to Use Job Context ===
export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
