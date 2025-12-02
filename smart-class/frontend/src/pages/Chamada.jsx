import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import AlunoRow from "../components/AlunoRow.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function Chamada() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [alunos, setAlunos] = useState([]);

  const fetchAlunos = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/alunos/turma/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlunos(res.data.map((a) => ({ ...a, presente: false })));
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      notify("Erro ao carregar alunos", "error");
    }
  };


  useEffect(() => {
    fetchAlunos();
  }, []);

  const marcarPresenca = (aluno, presente) => {
    setAlunos((prev) =>
      prev.map((a) => (a.id === aluno.id ? { ...a, presente } : a))
    );
  };

  const encerrarChamada = () => {
    notify("Chamada encerrada e salva!", "success");
    navigate(`/turma/${id}`);
  };

  return (
    <div>
      <Header usuario={user} />
      <div className="main-container">
        <h2>Chamada da Turma</h2>

        <table className="table">
          <thead>
            <tr><th>Aluno</th><th>Presença</th></tr>
          </thead>
          <tbody>
            {alunos.map((a) => (
              <AlunoRow
                key={a.id}
                aluno={a}
                modoChamada={true}
                onPresenca={marcarPresenca}
              />
            ))}
          </tbody>
        </table>

        <div className="actions-bar">
          <button className="primary" onClick={encerrarChamada}>Encerrar</button>
          <button className="danger" onClick={() => navigate(`/turma/${id}`)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
