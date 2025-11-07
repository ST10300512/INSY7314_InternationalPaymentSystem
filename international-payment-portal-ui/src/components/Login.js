import React, { useState } from "react";
import { loginUser } from "../api";
import { validateInput } from "../validation";

export default function Login() {
  const [form, setForm] = useState({ accountNumber: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(form.accountNumber, "accountPattern")) {
      alert("Invalid account number format.");
      return;
    }

    try {
      const res = await loginUser(form);
      const token = res.data.token;
      const role = res.data.role;
      if (!token) throw new Error("No token received.");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      alert("Logged in successfully");

      if (role === "employee") {
        window.location.href = "/employee";
      } else {
        window.location.href = "/customer";
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={sx.wrap}>
      <div style={sx.card}>
        <h2 style={sx.h}>Sign in</h2>
        <p style={sx.sub}>Enter your details to access the portal.</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <div style={sx.row}>
            <label style={sx.label}>Account Number</label>
            <input
              style={sx.input}
              name="accountNumber"
              placeholder="8–12 digits"
              onChange={handleChange}
              required
            />
          </div>

          <div style={sx.row}>
            <label style={sx.label}>Password</label>
            <input
              style={sx.input}
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={sx.primaryBtn}>Login</button>
        </form>
      </div>
    </div>
  );
}

const sx = {
  wrap: { minHeight: "60vh", display: "grid", placeItems: "center", padding: 24 },
  card: {
    width: "min(520px, 92vw)",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
  },
  h: { margin: 0, color: "#0b3954" },
  sub: { marginTop: 6, color: "#4b5563" },
  row: { display: "grid", gap: 8 },
  label: { fontSize: 14, color: "#374151" },
  input: {
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    outline: "none",
  },
  primaryBtn: {
    marginTop: 4,
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    background:
      "linear-gradient(135deg, rgba(11,57,84,1) 0%, rgba(20,99,141,1) 100%)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};
