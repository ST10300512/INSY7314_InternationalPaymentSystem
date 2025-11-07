import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();
  return (
    <div style={sx.wrap}>
      <div style={sx.card}>
        <h1 style={sx.title}>Welcome to the Portal</h1>
        <p style={sx.subtitle}>Choose how you want to continue:</p>

        <button
          style={{ ...sx.btn, ...sx.customer }}
          onClick={() => navigate("/login?role=customer")}
        >
          Login as Customer
        </button>

        <button
          style={{ ...sx.btn, ...sx.employee }}
          onClick={() => navigate("/login?role=employee")}
        >
          Login as Employee
        </button>
      </div>
    </div>
  );
}

const sx = {
  wrap: { minHeight: "70vh", display: "grid", placeItems: "center", padding: 24 },
  card: {
    width: "min(560px, 92vw)",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 28,
    boxShadow: "0 10px 28px rgba(0,0,0,.08)",
    background: "#fff",
    textAlign: "center",
  },
  title: { margin: 0, fontSize: "1.8rem", color: "#0b3954" },
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
