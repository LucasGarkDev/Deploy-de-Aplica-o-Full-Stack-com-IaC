import api from "./api";

export const iniciarChamada = async (turmaId, dataHora, quantidadeAulas) => {
  try {
    const { data } = await api.post("/chamada", { turmaId, dataHora, quantidadeAulas });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao iniciar chamada." };
  }
};

export const marcarPresenca = async (presencaId, presente) => {
  try {
    const { data } = await api.put(`/chamada/presenca/${presencaId}`, { presente });
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao marcar presença." };
  }
};

export const encerrarChamada = async (chamadaId) => {
  try {
    const { data } = await api.put(`/chamada/${chamadaId}/encerrar`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao encerrar chamada." };
  }
};

export const cancelarChamada = async (chamadaId) => {
  try {
    const { data } = await api.put(`/chamada/${chamadaId}/cancelar`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao cancelar chamada." };
  }
};

export const listarChamadasPorTurma = async (turmaId) => {
  try {
    const { data } = await api.get(`/chamada/turma/${turmaId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao listar chamadas." };
  }
};

export const detalharChamada = async (chamadaId) => {
  try {
    const { data } = await api.get(`/chamada/${chamadaId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao detalhar chamada." };
  }
};
