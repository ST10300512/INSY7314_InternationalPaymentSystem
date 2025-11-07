import React, { useState } from "react";
import { loginUser } from "../api";

export default function Login() {
  const [form, setForm] = useState({ accountNumber: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountPattern = /^\d{8,12}$/;
    if (!accountPattern.test(form.accountNumber)) {
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
      
      // Redirect based on role
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
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="accountNumber"
        placeholder="Account Number"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}