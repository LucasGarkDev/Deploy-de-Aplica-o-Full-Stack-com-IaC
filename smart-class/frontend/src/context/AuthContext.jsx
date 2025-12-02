import { createContext, useEffect, useState } from "react";
import { notify } from "../utils/notifications.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Carregar dados do usuário logado (se token existir)
  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const login = (userData, jwtToken) => {
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(jwtToken);
    notify("Login realizado com sucesso!", "success");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    notify("Sessão encerrada.", "info");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
