import { useState, useEffect } from "react";
import TurmaCard from "../components/TurmaCard.jsx";
import ModalCriarTurma from "../components/ModalCriarTurma.jsx";
import Header from "../components/Header.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ⬅ adicione

export default function Turmas() {
  const { user, token } = useAuth();
  const navigate = useNavigate(); // ⬅ adicione
  const [turmas, setTurmas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Buscar turmas do backend
  const fetchTurmas = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/turmas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTurmas(res.data);
    } catch (error) {
      console.error("Erro ao carregar turmas:", error);
      notify("Erro ao carregar turmas", "error");
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  // 🔹 Criar nova turma
  const handleCreate = async (nome) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/turmas`,
        { nome },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notify("Turma criada!", "success");
      setShowModal(false);
      fetchTurmas();
    } catch (error) {
      console.error("Erro ao criar turma:", error);
      notify("Erro ao criar turma", "error");
    }
  };

  // 🔹 Editar turma existente
  const handleEdit = async (turma) => {
    const novoNome = prompt("Novo nome da turma:", turma.nome);
    if (!novoNome || novoNome.trim() === turma.nome) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/turmas/${turma.id}`,
        { nome: novoNome.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      notify("Turma atualizada com sucesso!", "success");
      fetchTurmas();
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
      notify("Erro ao atualizar turma", "error");
    }
  };

  // 🔹 Excluir turma
  const handleDelete = async (id) => {
    if (!confirm("Excluir esta turma?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/turmas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTurmas();
      notify("Turma excluída!", "success");
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
      notify("Erro ao excluir turma", "error");
    }
  };

  return (
    <div>
      <Header usuario={user} />
      <div className="main-container">
        <h2>Minhas Turmas</h2>

        <div className="actions-bar">
          <button className="primary" onClick={() => setShowModal(true)}>
            + Nova Turma
          </button>
          <button className="secondary" onClick={() => navigate("/chamadas")}>
            📋 Ver Chamadas
          </button>
        </div>

        <div className="turma-grid">
          {turmas.map((t) => (
            <TurmaCard
              key={t.id}
              turma={t}
              onOpen={() => (window.location.href = `/turma/${t.id}`)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <ModalCriarTurma
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
