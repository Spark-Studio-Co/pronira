import { Navigate } from "react-router-dom";
import React from "react";
import { useAdminProfile } from "@/entities/admin/hooks/query/use-get-admin-profile.query";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useAdminProfile();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (isError || !data) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
