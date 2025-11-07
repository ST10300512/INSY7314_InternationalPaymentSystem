// import React, { useState } from "react";
// import { registerUser } from "../api";

// export default function Register() {
//   const [form, setForm] = useState({
//     fullName: "",
//     idNumber: "",
//     accountNumber: "",
//     password: "",
//   });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const sanitize = (str) => str.replace(/[<>]/g, "");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const namePattern = /^[A-Za-z\s]+$/;
//     const idPattern = /^\d{13}$/; // SA ID
//     const accountPattern = /^\d{8,12}$/;
//     const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//     if (!namePattern.test(form.fullName)) {
//       alert("Full name must only contain letters and spaces.");
//       return;
//     }
//     if (!idPattern.test(form.idNumber)) {
//       alert("ID number must be 13 digits.");
//       return;
//     }
//     if (!accountPattern.test(form.accountNumber)) {
//       alert("Account number must be 8–12 digits.");
//       return;
//     }
//     if (!passwordPattern.test(form.password)) {
//       alert("Password must be 8+ chars, 1 uppercase, 1 number, 1 special character.");
//       return;
//     }

//     try {
//       const sanitized = {
//         fullName: sanitize(form.fullName),
//         idNumber: form.idNumber,
//         accountNumber: form.accountNumber,
//         password: form.password,
//       };
//       const res = await registerUser(sanitized);
//       alert("Registration successful!");
//       console.log(res.data);
//       window.location.href = "/login";
//     } catch (err) {
//       alert("Registration failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
//       <input name="idNumber" placeholder="ID Number" onChange={handleChange} required />
//       <input name="accountNumber" placeholder="Account Number" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// }
