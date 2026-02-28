"use client";

//=== Imports ===
import React, { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/SharedComponents/Providers/AuthProvider";

//=== Protected Route Props ===
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

//=== Protected Route Component ===
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  //=== Auth Check Effect ===
  useEffect(() => {
    if (!isLoading) {
      //=== Not Authenticated -> Redirect to Login ===
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }

      //=== Role Check ===
      if (requiredRole && user?.role !== requiredRole) {
        //=== Unauthorized -> Redirect Based on Role ===
        if (user?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/jobs");
        }
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router]);

  //=== Loading State ===
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-[#F8F8FD]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#4640DE] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#7C8493]">Loading...</p>
        </div>
      </div>
    );
  }

  //=== Not Authenticated ===
  if (!isAuthenticated) {
    return null;
  }

  //=== Role Mismatch ===
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  //=== Render Children ===
  return <>{children}</>;
};

export default ProtectedRoute;
