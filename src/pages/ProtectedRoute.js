import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import NavBar from "./NavBar";
import Home from "./Home";
import MyClientsPage from "./MyClientsPage";
import ApprovalPage from "./ApprovalPage";
import AppointmentHistoryPage from "./AppointmentHistoryPage";
import Services from "./Services";

function ProtectedRoute() {
  const token = Cookies.get("token");
  return (
    <Routes>
      <Route path="/" element={token ? <NavBar /> : <Navigate to="/login" />}>
        <Route index path="Home" element={<Home />} />
        <Route index path="Client" element={<MyClientsPage />} />
        <Route index path="Appointment" element={<ApprovalPage />} />
        <Route index path="History" element={<AppointmentHistoryPage />} />
        <Route index path="Services" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default ProtectedRoute;
