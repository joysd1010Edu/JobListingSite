//=== Job Related Type Definitions ===

//=== Job Interface ===
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Remote" | "Internship";
  category: string;
  description: string;
  requirements: string;
  skills: string;
  education: string;
  benefits: string;
  companyDetails: string;
  salary: string;
  tags: string[];
  postedDate: string;
  logo?: string;
  applicants: JobApplicationData[];
}

//=== Job Application Form Data ===
export interface JobApplicationData {
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  appliedDate?: string;
}
