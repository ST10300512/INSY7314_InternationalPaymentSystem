import React, { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeDashboard(){
  const [pending, setPending] = useState([]);
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(()=> fetchPending(), []);

  async function fetchPending(){
    try {
      const res = await api.get("/api/EmployeePayments/pending", { headers });
      setPending(res.data);
    } catch(err) { console.error(err); }
  }

  async function verify(id){
    try {
      await api.post(`/api/EmployeePayments/verify/${id}`, null, { headers });
      fetchPending();
    } catch(err){ alert("Verify failed"); }
  }
  async function submit(id){
    try {
      await api.post(`/api/EmployeePayments/submit/${id}`, null, { headers });
      fetchPending();
    } catch(err){ alert("Submit failed"); }
  }

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <ul>
        {pending.map(p => (
          <li key={p.id}>
            {p.id} - {p.amount} {p.currency} - {p.swiftCode}
            <button onClick={()=>verify(p.id)}>Verify</button>
            <button onClick={()=>submit(p.id)}>Submit to SWIFT</button>
          </li>
        ))}
      </ul>
    </div>
  );
}