//FOR LATER USE - Employee Dashboard to verify and submit payments to SWIFT

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
    <div style={styles.container}>
      <h2 style={styles.title}>Employee Dashboard</h2>

      {loading ? (
        <p>Loading pending payments...</p>
      ) : pending.length === 0 ? (
        <p>No pending payments to verify.</p>
      ) : (
        <table style={styles.table}>
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
                <td>{p.id}</td>
                <td>{p.amount}</td>
                <td>{p.currency}</td>
                <td>{p.payeeAccount}</td>
                <td>{p.swiftCode}</td>
                <td>
                  <button style={styles.verifyBtn} onClick={() => verify(p.id)}>Verify</button>
                  <button style={styles.submitBtn} onClick={() => submit(p.id)}>Submit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0b3954",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  verifyBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    marginRight: "8px",
    border: "none",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },
};
