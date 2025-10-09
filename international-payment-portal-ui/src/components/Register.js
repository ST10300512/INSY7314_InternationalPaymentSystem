import React, { useState } from "react";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", accountNumber: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/api/Auth/register", form);
      alert("Registered: " + JSON.stringify(res.data));
    } catch (err) {
      alert("Error: " +  err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}