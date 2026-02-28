//=== Job Detail Route Page ===
import DetailPage from "@/PageComponent/JobDetail/DetailPage";
import ProtectedRoute from "@/SharedComponents/ProtectedRoute/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute requiredRole="user">
      <DetailPage />
    </ProtectedRoute>
  );
};

export default page;
