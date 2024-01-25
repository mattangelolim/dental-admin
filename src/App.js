import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import BettingDashboard from "./pages/BettingDashboard";
// import GameHistory from "./pages/GameHistory";
// import Agentlist from "./pages/Agentlist";
// import BettingResult from "./pages/BettingResult";

function App() {
  return (
    <div className="flex bg-gray-100 p-8 h-auto align-center justify-center">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
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
