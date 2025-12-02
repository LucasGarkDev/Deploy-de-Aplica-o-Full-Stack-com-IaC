import express from "express";
import {
  iniciarChamada,
  marcarPresenca,
  encerrarChamada,
  cancelarChamada,
  listarChamadasPorTurma,
  detalharChamada,
  listarChamadasDoProfessor, // ⬅ novo import
} from "../controllers/chamadaController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(autenticarToken);

// 🔹 NOVA rota — todas as chamadas do professor logado
router.get("/", listarChamadasDoProfessor);

// Iniciar chamada
router.post("/", iniciarChamada);

// Marcar presença (presencaId)
router.put("/presenca/:presencaId", marcarPresenca);

// Encerrar chamada
router.post("/:chamadaId/encerrar", encerrarChamada);

// Cancelar chamada
router.post("/:chamadaId/cancelar", cancelarChamada);

// Listar chamadas de uma turma
router.get("/turma/:turmaId", listarChamadasPorTurma);

// Detalhar chamada
router.get("/:chamadaId", detalharChamada);

export default router;
