import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        senha,
      });
      login({ email }, res.data.token);
      navigate("/turmas");
    } catch (err) {
      notify(err.response?.data?.error || "Falha no login", "error");
    }
  };

  return (
    <div className="login-page">
      <h2>Entrar no SmartClassroom</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha}
               onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit" className="primary">Entrar</button>
      </form>
      <p>
        Não possui conta?{" "}
        <span onClick={() => navigate("/register")}>Cadastrar</span>
      </p>
    </div>
  );
}
