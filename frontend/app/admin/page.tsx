"use client";

//=== Admin Route Page (Protected - Admin Only) ===
import AdminPanel from "@/PageComponent/Admin/AdminPanel";
import ProtectedRoute from "@/SharedComponents/ProtectedRoute/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  );
};

export default page;
