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
    // <div className="flex bg-gray-300 p-8 h-auto items-center justify-center">
    //   <Router>
    //     <Routes>
    //       <Route exact path="/" element={<UserLogin />} />
    //       <Route path="/home" element={<Home />} />
    //       <Route path="/myClients" element={<MyClientsPage />} />
    //       <Route path="/appointment/approval" element={<ApprovalPage />} />
    //       <Route
    //         path="/appointment/history"
    //         element={<AppointmentHistoryPage />}
    //       />

    //       {/* <Route path="/dashboard" element={<Dashboard />} />
    //       <Route path="/dashboard/bettings" element={<BettingDashboard />} />
    //       <Route path="/dashboard/game-history" element={<GameHistory />} />
    //       <Route
    //         path="/dashboard/betting-results"
    //         element={<BettingResult />}
    //       />
    //       <Route path="/agents" element={<Agentlist />} /> */}
    //     </Routes>
    //   </Router>
    // </div>

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
