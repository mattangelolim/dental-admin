import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import MyClientsPage from "./pages/MyClientsPage";
import ApprovalPage from "./pages/ApprovalPage";
import AppointmentHistoryPage from "./pages/AppointmentHistoryPage";

import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
