import React, { useState } from "react";
import { loginUser } from "../api";
import { validateInput } from "../validation";

export default function Login() {
  const [form, setForm] = useState({ accountNumber: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(form.accountNumber, "accountPattern")) {
      alert("Invalid account number format.");
      return;
    }

    try {
      const res = await loginUser(form);
      const token = res.data.token;
      if (!token) throw new Error("No token received.");
      localStorage.setItem("token", token);
      alert("Logged in successfully");
      window.location.href = "/customer";
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
