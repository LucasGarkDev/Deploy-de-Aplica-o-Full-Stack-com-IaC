import api from "./api";

export const sortear = async (tipo, turmaId) => {
  try {
    const { data } = await api.get(`/sorteio/${tipo}/${turmaId}`);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao realizar sorteio." };
  }
};
