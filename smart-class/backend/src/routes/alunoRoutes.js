import express from "express";
import {
  listarAlunos,
  criarAluno,
  atualizarAluno,
  excluirAluno,
} from "../controllers/alunoController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas as rotas exigem autenticação (professor logado)
router.use(autenticarToken);

// Listar alunos de uma turma
router.get("/turma/:turmaId", listarAlunos);

// Criar novo aluno em uma turma
router.post("/turma/:turmaId", criarAluno);

// Atualizar nome do aluno
router.put("/:id", atualizarAluno);

// Excluir aluno
router.delete("/:id", excluirAluno);

export default router;
