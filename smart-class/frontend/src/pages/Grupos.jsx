import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import ModalCriarGrupo from "../components/ModalCriarGrupo.jsx";
import GrupoCard from "../components/GrupoCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function Grupos() {
  const { id } = useParams(); // id da turma
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [grupos, setGrupos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchDados = async () => {
    try {
      // 🔹 Corrigido: agora busca alunos e grupos pela turma
      const [a, g] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/turmas/${id}/alunos`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/turmas/${id}/grupos`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAlunos(a.data);
      setGrupos(g.data);
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
      notify("Erro ao carregar grupos", "error");
    }
  };

  useEffect(() => {
    fetchDados();
  }, [id]);

  const handleCriarGrupo = async ({ nome, alunosIds }) => {
    try {
      // 🔹 Corrigido: cria grupo dentro da turma
      await axios.post(
        `${import.meta.env.VITE_API_URL}/turmas/${id}/grupos`,
        { nome, alunosIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      notify("Grupo criado!", "success");
      setShowModal(false);
      fetchDados();
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      notify("Erro ao criar grupo", "error");
    }
  };

  return (
    <div>
      <Header usuario={user} />
      <div className="main-container">
        <h2>Grupos da Turma</h2>
        <button className="primary" onClick={() => setShowModal(true)}>
          + Criar Grupo
        </button>

        <div className="turma-grid">
          {grupos.map((g) => (
            <GrupoCard key={g.id} grupo={g} />
          ))}
        </div>

        <button className="secondary" onClick={() => navigate(`/turma/${id}`)}>
          ← Voltar
        </button>
      </div>

      {showModal && (
        <ModalCriarGrupo
          alunos={alunos}
          onClose={() => setShowModal(false)}
          onCreate={handleCriarGrupo}
        />
      )}
    </div>
  );
}
