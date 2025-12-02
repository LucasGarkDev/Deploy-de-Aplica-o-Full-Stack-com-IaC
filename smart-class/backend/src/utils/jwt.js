import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Gera um token JWT com duração de 2 horas.
 */
export const gerarToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
};
