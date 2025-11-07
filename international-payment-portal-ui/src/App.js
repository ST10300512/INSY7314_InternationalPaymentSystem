import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import CustomerDashboard from "./components/CustomerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import RoleSelect from "./components/RoleSelect";
import LandingPage from "./components/LandingPage";

export default function App() {
  return (
    <Router>
      <nav style={sx.navbar}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 style={sx.logo}>Intl. Payment Portal</h2>
        </Link>
        <div>
          <Link to="/login" style={sx.link}>Login</Link>
          <Link to="/role-select" style={sx.link}>Choose Role</Link>
        </div>
      </nav>

      <div style={sx.container}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

const sx = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0b3954",
    color: "#fff",
    padding: "12px 24px",
  },
  logo: { margin: 0, fontSize: "1.1rem", color: "#fff" },
  link: {
    color: "#fff",
    marginLeft: "16px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: { padding: "32px 18px" },
};
