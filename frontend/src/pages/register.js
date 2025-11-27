import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const change = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", data);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Name" onChange={change} />
        <input name="email" placeholder="Email" onChange={change} />
        <input name="password" placeholder="Password" type="password" onChange={change} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
