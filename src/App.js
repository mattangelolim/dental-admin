import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
import MyClientsPage from './pages/MyClientsPage';
import ApprovalPage from "./pages/ApprovalPage";
import AppointmentHistoryPage from './pages/AppointmentHistoryPage';
// import BettingDashboard from "./pages/BettingDashboard";
// import GameHistory from "./pages/GameHistory";
// import Agentlist from "./pages/Agentlist";
// import BettingResult from "./pages/BettingResult";

function App() {
  return (
    <div className="flex bg-gray-300 p-8 h-auto items-center justify-center">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myClients" element={<MyClientsPage />} />
          <Route path="/appointment/approval" element={<ApprovalPage />} />
          <Route path="/appointment/history" element={<AppointmentHistoryPage />} />
          
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/bettings" element={<BettingDashboard />} />
          <Route path="/dashboard/game-history" element={<GameHistory />} />
          <Route
            path="/dashboard/betting-results"
            element={<BettingResult />}
          />
          <Route path="/agents" element={<Agentlist />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
