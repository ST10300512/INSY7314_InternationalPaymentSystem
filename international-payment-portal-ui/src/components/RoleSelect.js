import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();
  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to the Portal</h1>
        <p style={styles.subtitle}>Choose how you want to continue:</p>

        <button
          style={{ ...styles.btn, ...styles.customer }}
          onClick={() => navigate("/login?role=customer")}
        >
          Login as Customer
        </button>

        <button
          style={{ ...styles.btn, ...styles.employee }}
          onClick={() => navigate("/login?role=employee")}
        >
          Login as Employee
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: "60vh", display: "grid", placeItems: "center", padding: 24 },
  card: {
    width: "min(560px, 92vw)",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 28,
    boxShadow: "0 6px 24px rgba(0,0,0,.07)",
    background: "#fff",
  },
  title: { margin: 0, fontSize: "1.6rem", color: "#0b3954" },
  subtitle: { marginTop: 8, color: "#374151" },
  btn: {
    width: "100%",
    marginTop: 14,
    padding: "12px 16px",
    fontWeight: 700,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    cursor: "pointer",
  },
  customer: { background: "#e6f4ea" },
  employee: { background: "#e8f0fe" },
};