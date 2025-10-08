import React, { useEffect, useState } from "react";
import api from "../api";

export default function CustomerDashboard() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ amount: "", currency: "ZAR", provider: "SWIFT", swiftCode: "", payeeAccount: "" });

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    fetchMine();
  }, []);

  async function fetchMine() {
    try {
      const res = await api.get("/api/CustomerPayments/mine", { headers });
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await api.post("/api/CustomerPayments/create", form, { headers });
      alert("Payment created");
      fetchMine();
    } catch (err) {
      alert("Create failed");
    }
  }

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <form onSubmit={handleCreate}>
        <input placeholder="Amount" name="amount" onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <input placeholder="Currency" name="currency" value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} />
        <input placeholder="SWIFT" name="swiftCode" onChange={e => setForm({ ...form, swiftCode: e.target.value })} required />
        <input placeholder="Payee Account" name="payeeAccount" onChange={e => setForm({ ...form, payeeAccount: e.target.value })} required />
        <button type="submit">Pay Now</button>
      </form>

      <h3>Your Payments</h3>
      <ul>
        {payments.map(p => <li key={p.id}>{p.id} - {p.amount} {p.currency} - {p.status}</li>)}
      </ul>
    </div>
  );
}