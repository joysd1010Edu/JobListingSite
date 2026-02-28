//=== Jobs Listing Route Page ===
import Listing from "@/PageComponent/JobListing/Listing";
import ProtectedRoute from "@/SharedComponents/ProtectedRoute/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute requiredRole="user">
      <Listing />
    </ProtectedRoute>
  );
};

export default page;
