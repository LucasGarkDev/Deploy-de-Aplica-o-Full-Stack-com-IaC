import api from "./api";

export const register = async (nome, email, senha) => {
  try {
    const { data } = await api.post("/auth/register", { nome, email, senha });
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao registrar usuário." };
  }
};

export const login = async (email, senha) => {
  try {
    const { data } = await api.post("/auth/login", { email, senha });
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    throw err.response?.data || { error: "Erro ao realizar login." };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
