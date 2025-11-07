import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={sx.hero}>
      <div style={sx.panel}>
        <h1 style={sx.title}>International Payment Portal</h1>
        <p style={sx.tagline}>
          Secure, POPIA-aware international transfers for customers and employees.
        </p>
        <div style={sx.actions}>
          <button style={sx.cta} onClick={() => navigate("/role-select")}>
            Get Started
          </button>
          <button style={sx.ghost} onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

const sx = {
  hero: {
    minHeight: "70vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background:
      "radial-gradient(1200px 600px at 10% -10%, #e8f0fe 0%, transparent 60%), radial-gradient(1200px 600px at 110% 110%, #e6f4ea 0%, transparent 60%)",
  },
  panel: {
    width: "min(900px, 94vw)",
    background: "#fff",
    borderRadius: 18,
    padding: 32,
    border: "1px solid #e5e7eb",
    boxShadow: "0 16px 40px rgba(0,0,0,.08)",
    textAlign: "center",
  },
  title: { margin: 0, fontSize: "2rem", color: "#0b3954" },
  tagline: { marginTop: 10, color: "#4b5563" },
  actions: { display: "flex", gap: 12, justifyContent: "center", marginTop: 20 },
  cta: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    background:
      "linear-gradient(135deg, rgba(11,57,84,1) 0%, rgba(20,99,141,1) 100%)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  ghost: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
