import api from "./api";

export const listarGruposPorTurma = async (turmaId) => {
  try {
    const { data } = await api.get(`/grupos/${turmaId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao listar grupos." };
  }
};

export const criarGrupo = async (nome, turmaId, alunosIds = []) => {
  try {
    const { data } = await api.post("/grupos", { nome, turmaId, alunosIds });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao criar grupo." };
  }
};

export const atualizarGrupo = async (grupoId, nome) => {
  try {
    const { data } = await api.put(`/grupos/${grupoId}`, { nome });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao atualizar grupo." };
  }
};

export const adicionarAlunosAoGrupo = async (grupoId, alunosIds) => {
  try {
    const { data } = await api.post(`/grupos/${grupoId}/adicionar`, { alunosIds });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao adicionar alunos ao grupo." };
  }
};

export const removerAlunoDoGrupo = async (grupoId, alunoId) => {
  try {
    const { data } = await api.delete(`/grupos/${grupoId}/remover/${alunoId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao remover aluno do grupo." };
  }
};

export const excluirGrupo = async (grupoId) => {
  try {
    const { data } = await api.delete(`/grupos/${grupoId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao excluir grupo." };
  }
};
