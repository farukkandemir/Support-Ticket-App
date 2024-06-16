import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TicketDetails from "./pages/TicketDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket/:ticketId" element={<TicketDetails />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;
