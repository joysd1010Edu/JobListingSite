"use client";

//=== Imports ===
import React, { type ReactNode } from "react";
import { AuthProvider } from "@/SharedComponents/Providers/AuthProvider";
import { AxiosProvider } from "@/SharedComponents/Providers/AxiosProvider";
import { JobProvider } from "@/Hooks/useJobs";

//=== Client Providers Wrapper Component ===
export const ClientProviders: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AxiosProvider>
      <AuthProvider>
        <JobProvider>{children}</JobProvider>
      </AuthProvider>
    </AxiosProvider>
  );
};
