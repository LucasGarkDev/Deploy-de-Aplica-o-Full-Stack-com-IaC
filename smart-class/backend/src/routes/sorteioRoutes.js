import express from "express";
import { sortear } from "../controllers/sorteioController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(autenticarToken);

/**
 * Sorteia um aluno ou grupo
 * Exemplo de uso:
 * GET /api/sorteio/aluno/1
 * GET /api/sorteio/grupo/1
 */
router.get("/:tipo/:turmaId", sortear);

export default router;
