"use client";

//=== Imports ===
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Job, JobApplicationData } from "@/Type/Jobs/Job";
import { useAxios } from "@/Hooks/useAxios";

//=== Job Context Type ===
interface JobContextType {
  jobs: Job[];
  isLoading: boolean;
  addJob: (job: Omit<Job, "id" | "postedDate" | "applicants">) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  getJobById: (id: string) => Job | undefined;
  applyToJob: (id: string, application: JobApplicationData) => Promise<void>;
  fetchJobs: () => Promise<void>;
  fetchAdminJobs: () => Promise<void>;
}

//=== Job Context ===
const JobContext = createContext<JobContextType | undefined>(undefined);

//=== Job Provider Component ===
export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const axios = useAxios();

  //=== Fetch All Jobs (Public - no applicants) ===
  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/jobs");
      if (response.data.success) {
        const fetchedJobs = response.data.data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (job: any) => ({
            ...job,
            id: job._id || job.id,
            applicants: job.applicants || [],
          }),
        );
        setJobs(fetchedJobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  //=== Fetch Admin Jobs (with applicants) ===
  const fetchAdminJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/jobs/admin/all");
      if (response.data.success) {
        const fetchedJobs = response.data.data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (job: any) => ({
            ...job,
            id: job._id || job.id,
            applicants: job.applicants || [],
          }),
        );
        setJobs(fetchedJobs);
      }
    } catch (error) {
      console.error("Error fetching admin jobs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  //=== Load jobs on mount ===
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  //=== Add New Job (Admin) ===
  const addJob = async (
    jobData: Omit<Job, "id" | "postedDate" | "applicants">,
  ) => {
    const response = await axios.post("/jobs", jobData);
    if (response.data.success) {
      const newJob = {
        ...response.data.data,
        id: response.data.data._id || response.data.data.id,
        applicants: [],
      };
      setJobs((prev) => [newJob, ...prev]);
    }
  };

  //=== Delete Job (Admin) ===
  const deleteJob = async (id: string) => {
    await axios.delete(`/jobs/${id}`);
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  //=== Get Job By ID ===
  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  //=== Apply to Job (User) ===
  const applyToJob = async (
    id: string,
    application: JobApplicationData,
  ) => {
    await axios.post(`/jobs/${id}/apply`, application);
    
    //=== Optimistically update the local state ===
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
      value={{
        jobs,
        isLoading,
        addJob,
        deleteJob,
        getJobById,
        applyToJob,
        fetchJobs,
        fetchAdminJobs,
      }}
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
