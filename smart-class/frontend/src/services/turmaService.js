// turmaService.js
import api from "./api";

export const getTurmas = async () => {
  try {
    const { data } = await api.get("/turmas");
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao buscar turmas." };
  }
};

export const criarTurma = async (nome) => {
  try {
    const { data } = await api.post("/turmas", { nome });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao criar turma." };
  }
};

export const atualizarTurma = async (id, nome) => {
  try {
    const { data } = await api.put(`/turmas/${id}`, { nome });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao atualizar turma." };
  }
};

export const excluirTurma = async (id) => {
  try {
    const { data } = await api.delete(`/turmas/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao excluir turma." };
  }
};

export const getAlunosDaTurma = async (idTurma) => {
  try {
    const { data } = await api.get(`/turmas/${idTurma}/alunos`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao buscar alunos da turma." };
  }
};

