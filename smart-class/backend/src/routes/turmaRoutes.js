import express from "express";
import { autenticarToken } from "../middlewares/authMiddleware.js";
import {
  listarTurmas,
  criarTurma,
  atualizarTurma,
  excluirTurma,
  listarAlunosDaTurma, // <-- adicione aqui
  criarAlunoNaTurma,
  listarGruposDaTurma,   // 👈 novo
  criarGrupoNaTurma,  
} from "../controllers/turmaController.js";

const router = express.Router();

router.use(autenticarToken);

// Listar todas as turmas do usuário logado
router.get("/", listarTurmas);

// Criar nova turma
router.post("/", criarTurma);

// Atualizar nome da turma
router.put("/:id", atualizarTurma);

// Excluir turma (e dados relacionados)
router.delete("/:id", excluirTurma);

// Listar alunos de uma turma específica
router.get("/:id/alunos", listarAlunosDaTurma);

// Criar aluno em uma turma
router.post("/:id/alunos", criarAlunoNaTurma);

// Grupos
router.get("/:id/grupos", listarGruposDaTurma);
router.post("/:id/grupos", criarGrupoNaTurma);
export default router;
