// TurmaDetalhe.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import AlunoRow from "../components/AlunoRow.jsx";
import ModalChamada from "../components/ModalChamada.jsx";
import ModalSorteio from "../components/ModalSorteio.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function TurmaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [showChamada, setShowChamada] = useState(false);
  const [showSorteio, setShowSorteio] = useState(false);
  const [resultado, setResultado] = useState("");

  // 🔹 Buscar dados da turma e seus alunos
  const fetchDados = async () => {
    try {
      const [turmasRes, alunosRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/turmas`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/turmas/${id}/alunos`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setTurma(turmasRes.data.find((turma) => turma.id == id));
      setAlunos(alunosRes.data);
    } catch (error) {
      console.error("Erro ao carregar turma:", error);
      notify("Erro ao carregar turma", "error");
    }
  };

  useEffect(() => {
    fetchDados();
  }, [id]);

  // 🔹 Criar novo aluno
  const handleCriarAluno = async () => {
    const nome = prompt("Nome do novo aluno:");
    if (!nome) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/turmas/${id}/alunos`,
        { nome },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDados();
      notify("Aluno criado!", "success");
    } catch (error) {
      console.error(error);
      notify("Erro ao criar aluno", "error");
    }
  };

  // 🔹 Editar aluno
  const handleEditarAluno = async (aluno) => {
    const novoNome = prompt("Novo nome do aluno:", aluno.nome);
    if (!novoNome || novoNome.trim() === aluno.nome) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/alunos/${aluno.id}`,
        { nome: novoNome.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notify("Aluno atualizado!", "success");
      fetchDados();
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      notify("Erro ao atualizar aluno", "error");
    }
  };

  // 🔹 Excluir aluno
  const handleExcluirAluno = async (alunoId) => {
    if (!confirm("Excluir este aluno?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/alunos/${alunoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDados();
      notify("Aluno excluído", "success");
    } catch (error) {
      console.error(error);
      notify("Erro ao excluir aluno", "error");
    }
  };

  // 🔹 Sortear aluno ou grupo
  const handleSortear = async (tipo) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/sorteio/${tipo}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResultado(res.data.resultado);
      setShowSorteio(true);
    } catch {
      notify("Erro ao realizar sorteio", "error");
    }
  };

  // 🔹 Iniciar chamada
  const iniciarChamada = async ({ dataHora, quantidadeAulas }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/chamada`,
        {
          turmaId: Number(id),
          dataHora,
          quantidadeAulas,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notify("Chamada iniciada!", "success");
      setShowChamada(false);
      navigate(`/chamada/${id}`);
    } catch {
      notify("Erro ao iniciar chamada", "error");
    }
  };

  // 🔹 Voltar para a listagem de turmas
  const handleVoltar = () => {
    navigate("/turmas");
  };

  return (
    <div>
      <Header usuario={user} />
      <div className="main-container">
        <h2>{turma?.nome || "Turma"}</h2>

        <div className="actions-bar">
          <button className="secondary" onClick={handleVoltar}>
            ⬅ Voltar
          </button>
          <button className="primary" onClick={handleCriarAluno}>
            + Novo Aluno
          </button>
          <button className="secondary" onClick={() => navigate(`/grupos/${id}`)}>
            👥 Grupos
          </button>
          <button className="accent" onClick={() => handleSortear("aluno")}>
            🎲 Sortear Aluno
          </button>
          <button className="accent" onClick={() => handleSortear("grupo")}>
            🎯 Sortear Grupo
          </button>
          <button className="danger" onClick={() => setShowChamada(true)}>
            📋 Iniciar Chamada
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((a) => (
              <AlunoRow
                key={a.id}
                aluno={a}
                onEdit={handleEditarAluno}
                onDelete={handleExcluirAluno}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showChamada && (
        <ModalChamada onClose={() => setShowChamada(false)} onStart={iniciarChamada} />
      )}
      {showSorteio && (
        <ModalSorteio resultado={resultado} onClose={() => setShowSorteio(false)} />
      )}
    </div>
  );
}
