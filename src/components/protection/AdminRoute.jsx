import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
