const User = require("../models/User");
const Job = require("../models/Job");

// === Dummy Job Data ===
const dummyJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    location: "San Francisco, CA",
    type: "Full-Time",
    category: "Technology",
    description:
      "We are looking for an experienced Frontend Developer to join our team and build modern, responsive web applications using React, Next.js, and TypeScript. You will collaborate with designers and backend engineers to deliver high-quality user experiences.",
    requirements:
      "5+ years of experience in frontend development. Proficiency in React, Next.js, and TypeScript. Strong understanding of responsive design and CSS frameworks like Tailwind CSS. Experience with state management libraries such as Redux or Zustand.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Redux, Git",
    education: "Bachelor's degree in Computer Science or related field",
    benefits:
      "Competitive salary, health insurance, 401(k) matching, remote work flexibility, annual learning budget of $2,000",
    companyDetails:
      "TechNova Solutions is a fast-growing SaaS company building next-generation productivity tools for remote teams. Founded in 2020, we serve over 10,000 businesses worldwide.",
    salary: "$120,000 - $160,000",
    tags: ["React", "Next.js", "TypeScript", "Frontend"],
  },
  {
    title: "UX/UI Designer",
    company: "CreativePixel Agency",
    location: "New York, NY",
    type: "Full-Time",
    category: "Design",
    description:
      "Join our award-winning design team to create beautiful, intuitive interfaces for web and mobile applications. You will lead the design process from research and wireframing through to high-fidelity prototypes and developer handoff.",
    requirements:
      "3+ years of UX/UI design experience. Expert-level proficiency in Figma. Strong portfolio showcasing web and mobile design projects. Experience conducting user research and usability testing.",
    skills: "Figma, Adobe XD, Prototyping, User Research, Design Systems",
    education: "Bachelor's degree in Design, HCI, or equivalent experience",
    benefits:
      "Health & dental insurance, unlimited PTO, creative workspace in Manhattan, team retreats, latest MacBook Pro",
    companyDetails:
      "CreativePixel Agency is a boutique design agency working with Fortune 500 clients and ambitious startups. We've won multiple Webby Awards for our innovative design work.",
    salary: "$90,000 - $130,000",
    tags: ["UI/UX", "Figma", "Design Systems", "Prototyping"],
  },
  {
    title: "Backend Engineer (Node.js)",
    company: "CloudScale Inc.",
    location: "Austin, TX",
    type: "Remote",
    category: "Engineering",
    description:
      "We need a talented Backend Engineer to design and build scalable APIs and microservices. You will work on our cloud infrastructure platform that handles millions of requests daily, focusing on performance, reliability, and security.",
    requirements:
      "4+ years of backend development experience with Node.js. Strong knowledge of RESTful APIs and GraphQL. Experience with MongoDB and PostgreSQL. Familiarity with Docker, Kubernetes, and AWS services.",
    skills: "Node.js, Express, MongoDB, PostgreSQL, Docker, AWS",
    education: "Bachelor's degree in Computer Science or equivalent",
    benefits:
      "Fully remote, equity options, $3,000 home office stipend, flexible hours, conference attendance budget",
    companyDetails:
      "CloudScale Inc. provides enterprise cloud infrastructure solutions. Backed by $50M in Series B funding, we're scaling rapidly and building the future of cloud computing.",
    salary: "$130,000 - $170,000",
    tags: ["Node.js", "MongoDB", "AWS", "Backend"],
  },
  {
    title: "Digital Marketing Manager",
    company: "GrowthHub Digital",
    location: "Chicago, IL",
    type: "Full-Time",
    category: "Marketing",
    description:
      "Lead our digital marketing strategy across all channels including SEO, SEM, social media, and email marketing. You will manage a team of 4 marketers and be responsible for driving user acquisition and brand awareness.",
    requirements:
      "5+ years of digital marketing experience. Proven track record of running successful paid campaigns on Google Ads and Meta. Strong analytical skills with experience in Google Analytics and data-driven decision making.",
    skills:
      "SEO, Google Ads, Meta Ads, Google Analytics, Email Marketing, Content Strategy",
    education: "Bachelor's degree in Marketing, Business, or related field",
    benefits:
      "Competitive base + performance bonus, health insurance, gym membership, hybrid work model, professional development budget",
    companyDetails:
      "GrowthHub Digital is a performance marketing agency helping D2C brands scale from $1M to $50M+ in revenue. We manage over $20M in annual ad spend.",
    salary: "$95,000 - $125,000",
    tags: ["SEO", "Google Ads", "Marketing", "Analytics"],
  },
  {
    title: "Financial Analyst",
    company: "Apex Capital Partners",
    location: "Boston, MA",
    type: "Full-Time",
    category: "Finance",
    description:
      "Analyze financial data, prepare reports, and provide strategic recommendations to senior leadership. You will build financial models, track KPIs, and support budgeting and forecasting across the organization.",
    requirements:
      "3+ years of financial analysis experience. Advanced Excel and financial modeling skills. Experience with ERP systems and BI tools like Tableau or Power BI. Strong attention to detail and communication skills.",
    skills: "Financial Modeling, Excel, Tableau, Power BI, SQL, Forecasting",
    education:
      "Bachelor's degree in Finance, Accounting, or Economics. CFA preferred.",
    benefits:
      "Competitive salary + annual bonus, 401(k) with 6% match, health/dental/vision, tuition reimbursement, mentorship program",
    companyDetails:
      "Apex Capital Partners is a mid-market private equity firm with $2B in assets under management. We invest in high-growth technology and healthcare companies.",
    salary: "$85,000 - $115,000",
    tags: ["Finance", "Excel", "Tableau", "Financial Modeling"],
  },
  {
    title: "Sales Development Representative",
    company: "SalesForce Pro",
    location: "Denver, CO",
    type: "Full-Time",
    category: "Sales",
    description:
      "Drive new business by prospecting and qualifying leads through outbound outreach. You will be the first point of contact for potential customers, setting meetings for Account Executives and building a strong pipeline.",
    requirements:
      "1-2 years of sales or SDR experience in B2B SaaS. Excellent communication and interpersonal skills. Experience with CRM tools like Salesforce or HubSpot. Self-motivated with a hunter mentality.",
    skills:
      "Salesforce CRM, Cold Outreach, Lead Generation, HubSpot, LinkedIn Sales Navigator",
    education: "Bachelor's degree in any field",
    benefits:
      "Base salary + uncapped commission, President's Club trip, health insurance, career growth into AE role, weekly sales training",
    companyDetails:
      "SalesForce Pro provides AI-powered sales enablement tools to over 5,000 B2B companies. We're a Series C startup with 300+ employees and growing rapidly.",
    salary: "$55,000 - $75,000 + Commission",
    tags: ["Sales", "B2B", "SaaS", "Lead Generation"],
  },
  {
    title: "HR Business Partner",
    company: "PeopleFirst Corp",
    location: "Seattle, WA",
    type: "Full-Time",
    category: "Human Resource",
    description:
      "Partner with business leaders to develop and implement HR strategies that support organizational goals. You will manage employee relations, talent development, performance management, and workforce planning initiatives.",
    requirements:
      "5+ years of HR experience in a fast-paced environment. Strong knowledge of employment law and HR best practices. Experience with HRIS systems like Workday or BambooHR. Excellent conflict resolution and coaching skills.",
    skills:
      "Employee Relations, Talent Management, Workday, Performance Management, HR Strategy",
    education:
      "Bachelor's degree in Human Resources, Business, or Psychology. SHRM-CP or PHR certification preferred.",
    benefits:
      "Competitive salary, full medical/dental/vision, 20 days PTO + holidays, parental leave, employee wellness program",
    companyDetails:
      "PeopleFirst Corp is a 2,000-employee technology company building HR software for the modern workplace. We practice what we preach with an award-winning culture.",
    salary: "$100,000 - $135,000",
    tags: ["HR", "Employee Relations", "Talent Management", "Workday"],
  },
  {
    title: "Data Scientist",
    company: "InsightAI Labs",
    location: "Remote",
    type: "Remote",
    category: "Technology",
    description:
      "Build machine learning models and data pipelines to extract actionable insights from large datasets. You will work closely with product and engineering teams to deploy ML solutions that drive business impact at scale.",
    requirements:
      "3+ years of experience in data science or machine learning. Proficiency in Python, pandas, scikit-learn, and TensorFlow or PyTorch. Experience with cloud ML platforms (AWS SageMaker, GCP Vertex AI). Strong statistical foundation.",
    skills: "Python, TensorFlow, PyTorch, SQL, Pandas, Machine Learning, AWS",
    education:
      "Master's or PhD in Computer Science, Statistics, Mathematics, or related field",
    benefits:
      "Fully remote, competitive equity package, $4,000 annual learning budget, flexible hours, quarterly team offsites",
    companyDetails:
      "InsightAI Labs is an AI research company applying cutting-edge machine learning to healthcare and climate challenges. Backed by top-tier VCs with $30M in funding.",
    salary: "$140,000 - $180,000",
    tags: ["Machine Learning", "Python", "Data Science", "AI"],
  },
  {
    title: "Business Development Manager",
    company: "PartnerBridge Global",
    location: "Miami, FL",
    type: "Full-Time",
    category: "Business",
    description:
      "Identify and develop strategic partnerships to expand our market presence across Latin America and the Caribbean. You will negotiate deals, manage partner relationships, and drive revenue growth through channel partnerships.",
    requirements:
      "5+ years of business development or partnerships experience. Strong negotiation and relationship management skills. Experience in the technology or fintech sector. Bilingual English/Spanish strongly preferred.",
    skills:
      "Partnership Strategy, Negotiation, CRM, Market Research, Revenue Growth",
    education:
      "Bachelor's degree in Business Administration or related field. MBA preferred.",
    benefits:
      "Base + performance bonus, travel opportunities, health insurance, stock options, relocation assistance available",
    companyDetails:
      "PartnerBridge Global is a fintech platform connecting businesses with financial services across emerging markets. Operating in 15 countries with 200+ employees.",
    salary: "$110,000 - $145,000",
    tags: ["Business Development", "Partnerships", "Fintech", "Strategy"],
  },
  {
    title: "DevOps Engineer Intern",
    company: "LaunchPad Technologies",
    location: "Portland, OR",
    type: "Internship",
    category: "Engineering",
    description:
      "Join our DevOps team for a 6-month paid internship where you will learn to build and maintain CI/CD pipelines, manage cloud infrastructure, and automate deployment processes. This is a hands-on role with mentorship from senior engineers.",
    requirements:
      "Currently pursuing a degree in Computer Science or related field. Basic knowledge of Linux, Git, and at least one programming language (Python, Bash, or Go). Eagerness to learn cloud technologies and DevOps practices.",
    skills: "Linux, Git, Docker, CI/CD, Python, AWS basics",
    education:
      "Currently enrolled in a Bachelor's or Master's program in Computer Science, IT, or related field",
    benefits:
      "Paid internship ($30/hr), mentorship program, free lunch, potential full-time conversion, access to all company learning resources",
    companyDetails:
      "LaunchPad Technologies is a developer tools company building the next generation of deployment and infrastructure management platforms. We love investing in early-career talent.",
    salary: "$30/hr",
    tags: ["DevOps", "Internship", "Docker", "CI/CD"],
  },
];

// === Seed Default Admin Account ===
const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    if (!adminEmail || !adminPassword || !adminName) {
      console.log(" Admin env variables not set, skipping admin seed.");
      return;
    }

    // === Check if admin already exists ===
    let admin = await User.findOne({ email: adminEmail });
    if (admin) {
      console.log("✅ Default admin account already exists.");
    } else {
      // === Create admin user ===
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log(`✅ Default admin account created: ${adminEmail}`);
    }

    // === Seed Jobs if none exist ===
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      const jobsWithPostedBy = dummyJobs.map((job) => ({
        ...job,
        postedBy: admin._id,
      }));
      await Job.insertMany(jobsWithPostedBy);
      console.log(`✅ Seeded ${dummyJobs.length} dummy jobs.`);
    } else {
      console.log(
        `✅ Jobs already exist (${jobCount} found), skipping job seed.`,
      );
    }
  } catch (error) {
    console.error("❌ Error seeding:", error.message);
  }
};

module.exports = seedAdmin;
