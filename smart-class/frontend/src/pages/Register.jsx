import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { nome, email, senha });
      notify("Conta criada com sucesso!", "success");
      navigate("/login");
    } catch (err) {
      notify(err.response?.data?.error || "Erro ao registrar", "error");
    }
  };

  return (
    <div className="register-page">
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit" className="primary">Cadastrar</button>
      </form>
      <p>
        Já possui conta?{" "}
        <span onClick={() => navigate("/login")}>Entrar</span>
      </p>
    </div>
  );
}
