import api from "./api";

export const listarAlunos = async (turmaId) => {
  try {
    const { data } = await api.get(`/alunos/${turmaId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao listar alunos." };
  }
};

export const criarAluno = async (turmaId, nome) => {
  try {
    const { data } = await api.post(`/alunos/${turmaId}`, { nome });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao criar aluno." };
  }
};

export const atualizarAluno = async (id, nome) => {
  try {
    const { data } = await api.put(`/alunos/${id}`, { nome });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao atualizar aluno." };
  }
};

export const excluirAluno = async (id) => {
  try {
    const { data } = await api.delete(`/alunos/${id}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao excluir aluno." };
  }
};
