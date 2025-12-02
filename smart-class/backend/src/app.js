import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotas
import authRoutes from "./routes/authRoutes.js";
import turmaRoutes from "./routes/turmaRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import grupoRoutes from "./routes/grupoRoutes.js";
import sorteioRoutes from "./routes/sorteioRoutes.js";
import chamadaRoutes from "./routes/chamadaRoutes.js";

dotenv.config();
const app = express();

// ===== Middlewares globais =====
app.use(cors({ origin: "*" })); // liberação simples (pode ser restrita depois)
app.use(express.json());

// ===== Rotas públicas =====
app.use("/api/auth", authRoutes);

// ===== Rotas protegidas =====
app.use("/api/turmas", turmaRoutes);
app.use("/api/alunos", alunoRoutes);
app.use("/api/grupos", grupoRoutes);
app.use("/api/sorteio", sorteioRoutes);
app.use("/api/chamada", chamadaRoutes);

// ===== Rota de status =====
app.get("/", (req, res) => {
  res.status(200).send("🚀 API SmartClassroom rodando com sucesso!");
});

// ===== Tratamento de erros genéricos =====
app.use((err, req, res, next) => {
  console.error("Erro inesperado:", err);
  res.status(500).json({ error: "Erro interno no servidor." });
});

export default app;
