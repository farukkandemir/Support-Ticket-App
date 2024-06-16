import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TicketDetails from "./pages/TicketDetails";
import { useAuth } from "./context/AuthProvider";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <CircularProgress
        sx={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
        }}
        size={48}
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

const RoleBasedRoute = ({
  children,
  requiredRole,
}: {
  children: any;
  requiredRole: string;
}) => {
  const { isAuthenticated, userData, loading } = useAuth();
  const { role } = userData || {};

  if (loading) {
    return (
      <CircularProgress
        sx={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
        }}
        size={48}
      />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket/:ticketId"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <RoleBasedRoute requiredRole="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
