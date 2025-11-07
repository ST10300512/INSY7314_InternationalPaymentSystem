import React, { useState } from "react";
import { submitPayment } from "../api";

export default function CustomerDashboard() {
  const [form, setForm] = useState({
    amount: "",
    currency: "ZAR",
    provider: "SWIFT",
    payeeAccount: "",
    swiftCode: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sanitize = (str) => str.replace(/[<>]/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountPattern = /^[0-9]+(\.[0-9]{1,2})?$/;
    const swiftPattern = /^[A-Z]{6}[A-Z0-9]{2,5}$/;
    const accountPattern = /^\d{8,12}$/;

    if (!amountPattern.test(form.amount)) {
      alert("Amount must be a valid number.");
      return;
    }
    if (!accountPattern.test(form.payeeAccount)) {
      alert("Invalid payee account number.");
      return;
    }
    if (!swiftPattern.test(form.swiftCode)) {
      alert("Invalid SWIFT code format.");
      return;
    }

    try {
      const sanitized = {
        ...form,
        payeeAccount: sanitize(form.payeeAccount),
        swiftCode: sanitize(form.swiftCode),
      };
      const res = await submitPayment(sanitized);
      alert("Payment submitted successfully!");
      console.log(res.data);
    } catch (err) {
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={sx.wrap}>
      <div style={sx.header}>
        <h2 style={sx.h}>Customer Dashboard</h2>
        <p style={sx.sub}>Submit a secure international payment via SWIFT.</p>
      </div>

      <form onSubmit={handleSubmit} style={sx.card}>
        <div style={sx.row}>
          <label style={sx.label}>Amount</label>
          <input
            style={sx.input}
            name="amount"
            placeholder="0.00"
            onChange={handleChange}
            required
          />
        </div>

        <div style={sx.twoCol}>
          <div style={sx.col}>
            <label style={sx.label}>Currency</label>
            <input
              style={sx.input}
              name="currency"
              value={form.currency}
              onChange={handleChange}
              required
            />
          </div>
          <div style={sx.col}>
            <label style={sx.label}>Provider</label>
            <input
              style={sx.input}
              name="provider"
              value={form.provider}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={sx.row}>
          <label style={sx.label}>SWIFT Code</label>
          <input
            style={sx.input}
            name="swiftCode"
            placeholder="e.g. ABSAZAJJ"
            onChange={handleChange}
            required
          />
        </div>

        <div style={sx.row}>
          <label style={sx.label}>Payee Account</label>
          <input
            style={sx.input}
            name="payeeAccount"
            placeholder="8–12 digits"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={sx.primaryBtn}>Pay Now</button>
      </form>
    </div>
  );
}

const sx = {
  wrap: { maxWidth: 820, margin: "0 auto", padding: "24px" },
  header: { marginBottom: 12 },
  h: { margin: 0, color: "#0b3954", fontSize: "1.6rem" },
  sub: { margin: "6px 0 0", color: "#4b5563" },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
    display: "grid",
    gap: 14,
  },
  row: { display: "grid", gap: 8 },
  twoCol: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "1fr 1fr",
  },
  col: { display: "grid", gap: 8 },
  label: { fontSize: 14, color: "#374151" },
  input: {
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    outline: "none",
  },
  primaryBtn: {
    marginTop: 6,
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
