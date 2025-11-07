import React, { useState } from "react";
import { submitPayment } from "../api";
import { validateInput } from "../validation";

export default function CustomerDashboard() {
  
  const [form, setForm] = useState({
    amount: "",
    currency: "ZAR",
    provider: "SWIFT",
    payeeAccount: "",
    swiftCode: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sanitize = (str) => str.replace(/[<>]/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput(form.amount, "amountPattern")) {
      alert("Amount must be a valid number.");
      return;
    }
    if (!validateInput(form.payeeAccount, "accountPattern")) {
      alert("Invalid payee account number.");
      return;
    }
    if (!validateInput(form.swiftCode, "swiftPattern")) {
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
    <div>
      <h2>Customer Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <input
          name="currency"
          value={form.currency}
          onChange={handleChange}
          required
        />
        <input
          name="swiftCode"
          placeholder="SWIFT Code"
          onChange={handleChange}
          required
        />
        <input
          name="payeeAccount"
          placeholder="Payee Account"
          onChange={handleChange}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
