// FOR LATER USE - Employee Dashboard to verify and submit payments to SWIFT
import React, { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeDashboard() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    try {
      setLoading(true);
      const res = await api.get("/payments/pending");
      setPending(res.data);
    } catch (err) {
      console.error("Error fetching pending payments:", err);
      alert("Failed to fetch pending payments.");
    } finally {
      setLoading(false);
    }
  }

  async function verify(id) {
    if (!window.confirm(`Verify payment ID: ${id}?`)) return;
    try {
      await api.post(`/payments/verify/${id}`);
      alert("Payment verified.");
      fetchPending();
    } catch (err) {
      console.error(err);
      alert("Verification failed.");
    }
  }

  async function submit(id) {
    if (!window.confirm(`Submit payment ID: ${id} to SWIFT?`)) return;
    try {
      await api.post(`/payments/submit/${id}`);
      alert("Payment submitted to SWIFT.");
      fetchPending();
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  }

  return (
    <div style={sx.wrap}>
      <div style={sx.header}>
        <h2 style={sx.h}>Employee Dashboard</h2>
        <p style={sx.sub}>Review, verify and submit pending customer payments.</p>
      </div>

      <div style={sx.card}>
        {loading ? (
          <p style={{ margin: 0 }}>Loading pending payments...</p>
        ) : pending.length === 0 ? (
          <p style={{ margin: 0 }}>No pending payments to verify.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={sx.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Payee Account</th>
                  <th>SWIFT Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.id}>
                    <td><code>{p.id}</code></td>
                    <td>{p.amount}</td>
                    <td><span style={sx.badge}>{p.currency}</span></td>
                    <td>{p.payeeAccount}</td>
                    <td>{p.swiftCode}</td>
                    <td>
                      <button style={{ ...sx.btn, ...sx.verify }} onClick={() => verify(p.id)}>
                        Verify
                      </button>
                      <button style={{ ...sx.btn, ...sx.submit }} onClick={() => submit(p.id)}>
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const sx = {
  wrap: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  header: { marginBottom: 12 },
  h: { margin: 0, color: "#0b3954", fontSize: "1.6rem" },
  sub: { margin: "6px 0 0", color: "#4b5563" },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  badge: {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: 999,
    background: "#e8f0fe",
    fontSize: 12,
  },
  btn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    marginRight: 8,
  },
  verify: { background: "#0ea5e9", color: "#fff" },
  submit: { background: "#22c55e", color: "#fff" },
};
