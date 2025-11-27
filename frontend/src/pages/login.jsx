import { useState, useContext } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const change = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", data);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" placeholder="Email" onChange={change} />
        <input name="password" placeholder="Password" type="password" onChange={change} />
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
