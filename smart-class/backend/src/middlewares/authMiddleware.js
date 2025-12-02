import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const autenticarToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = header.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user; // ✅ mantém compatibilidade com o resto do sistema
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado. Faça login novamente." });
    }
    console.error("Erro de autenticação:", error);
    res.status(403).json({ error: "Token inválido." });
  }
};
