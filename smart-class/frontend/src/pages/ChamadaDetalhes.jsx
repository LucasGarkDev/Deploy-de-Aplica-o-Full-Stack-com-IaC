import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function ChamadaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [chamada, setChamada] = useState(null);

  const fetchDetalhes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chamada/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChamada(res.data);
    } catch (error) {
      console.error("Erro ao carregar detalhes da chamada:", error);
      notify("Erro ao carregar detalhes da chamada", "error");
    }
  };

  useEffect(() => {
    fetchDetalhes();
  }, [id]);

  if (!chamada) return null;

  return (
    <div>
      <Header usuario={user} />
      <div className="main-container">
        <h2>📋 Detalhes da Chamada</h2>
        <p><b>Turma:</b> {chamada.turma?.nome}</p>
        <p><b>Data:</b> {new Date(chamada.dataHora).toLocaleString("pt-BR")}</p>
        <p><b>Quantidade de Aulas:</b> {chamada.quantidadeAulas}</p>

        <h3>Alunos</h3>
        <table className="table">
          <thead>
            <tr><th>Nome</th><th>Presença</th></tr>
          </thead>
          <tbody>
            {chamada.presencas?.map((p) => (
              <tr key={p.id}>
                <td>{p.aluno?.nome}</td>
                <td>{p.presente ? "✅ Presente" : "❌ Ausente"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="secondary" onClick={() => navigate("/chamadas")}>
          ⬅ Voltar
        </button>
      </div>
    </div>
  );
}
