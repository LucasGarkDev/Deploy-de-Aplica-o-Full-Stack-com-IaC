import express from "express";
import {
  criarGrupo,
  listarGruposPorTurma,
  atualizarGrupo,
  adicionarAlunosAoGrupo,
  removerAlunoDoGrupo,
  excluirGrupo,
} from "../controllers/grupoController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(autenticarToken);

// Criar grupo
router.post("/", criarGrupo);

// Listar grupos de uma turma
router.get("/turma/:turmaId", listarGruposPorTurma);

// Atualizar nome do grupo
router.put("/:grupoId", atualizarGrupo);

// Adicionar alunos ao grupo
router.post("/:grupoId/alunos", adicionarAlunosAoGrupo);

// Remover aluno do grupo
router.delete("/:grupoId/alunos/:alunoId", removerAlunoDoGrupo);

// Excluir grupo
router.delete("/:grupoId", excluirGrupo);

export default router;
