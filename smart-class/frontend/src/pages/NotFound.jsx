import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="login-page" style={{ textAlign: "center" }}>
      <h2>404 — Página não encontrada</h2>
      <p>A página que você tentou acessar não existe.</p>
      <button className="primary" onClick={() => navigate("/")}>
        Voltar para o início
      </button>
    </div>
  );
}
