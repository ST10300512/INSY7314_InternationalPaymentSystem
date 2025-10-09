import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CustomerDashboard from "./components/CustomerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";

export default function App() {
  return (
    <Router>
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>International Payment Portal</h2>
        <div>
          <Link to="/register" style={styles.link}>Register</Link>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0b3954",
    color: "#fff",
    padding: "12px 24px",
  },
  logo: { margin: 0, fontSize: "1.2rem" },
  link: {
    color: "#fff",
    marginLeft: "16px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
  },
};
