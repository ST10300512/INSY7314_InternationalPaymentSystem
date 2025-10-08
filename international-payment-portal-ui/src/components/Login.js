import React, { useState } from "react";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ emailOrAccount: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/api/Auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("Logged in");
      // redirect to dashboard
      window.location.href = "/customer";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="emailOrAccount" placeholder="Email or Account" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}