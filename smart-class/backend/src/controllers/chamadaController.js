// controllers/chamadaController.js
import prisma from "../utils/prismaClient.js";

/**
 * 1️⃣ Iniciar nova chamada
 */
export const iniciarChamada = async (req, res) => {
  try {
    const { turmaId, dataHora, quantidadeAulas } = req.body;

    if (!turmaId || !dataHora || !quantidadeAulas) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    // Verifica se a turma existe
    const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    // Cria a chamada
    const chamada = await prisma.chamada.create({
      data: {
        dataHora: new Date(dataHora),
        turmaId: Number(turmaId),
        quantidadeAulas: Number(quantidadeAulas),
        status: "ATIVA",
      },
    });

    // Busca os alunos da turma
    const alunos = await prisma.aluno.findMany({ where: { turmaId: Number(turmaId) } });

    // Cria registros de presença padrão (presente = false)
    await prisma.presenca.createMany({
      data: alunos.map((a) => ({
        alunoId: a.id,
        chamadaId: chamada.id,
        presente: false,
      })),
    });

    const chamadaCompleta = await prisma.chamada.findUnique({
      where: { id: chamada.id },
      include: {
        presencas: { include: { aluno: true } },
      },
    });

    res.status(201).json({
      message: "Chamada iniciada com sucesso!",
      chamada: chamadaCompleta,
    });
  } catch (error) {
    console.error("Erro ao iniciar chamada:", error);
    res.status(500).json({ error: "Erro ao iniciar chamada." });
  }
};

/**
 * 2️⃣ Marcar presença de um aluno
 */
export const marcarPresenca = async (req, res) => {
  try {
    const { presencaId } = req.params;
    const { presente } = req.body;

    const presenca = await prisma.presenca.findUnique({ where: { id: Number(presencaId) } });
    if (!presenca) {
      return res.status(404).json({ error: "Registro de presença não encontrado." });
    }

    const atualizada = await prisma.presenca.update({
      where: { id: Number(presencaId) },
      data: { presente: Boolean(presente) },
      include: { aluno: true, chamada: true },
    });

    res.json({ message: "Presença atualizada com sucesso!", presenca: atualizada });
  } catch (error) {
    console.error("Erro ao marcar presença:", error);
    res.status(500).json({ error: "Erro ao marcar presença." });
  }
};

/**
 * 3️⃣ Encerrar chamada
 */
export const encerrarChamada = async (req, res) => {
  try {
    const { chamadaId } = req.params;

    const chamada = await prisma.chamada.findUnique({ where: { id: Number(chamadaId) } });
    if (!chamada) {
      return res.status(404).json({ error: "Chamada não encontrada." });
    }

    if (chamada.status !== "ATIVA") {
      return res.status(400).json({ error: "Chamada já encerrada ou cancelada." });
    }

    const encerrada = await prisma.chamada.update({
      where: { id: Number(chamadaId) },
      data: { status: "ENCERRADA" },
      include: { presencas: { include: { aluno: true } } },
    });

    res.json({ message: "Chamada encerrada com sucesso!", chamada: encerrada });
  } catch (error) {
    console.error("Erro ao encerrar chamada:", error);
    res.status(500).json({ error: "Erro ao encerrar chamada." });
  }
};

/**
 * 4️⃣ Cancelar chamada
 */
export const cancelarChamada = async (req, res) => {
  try {
    const { chamadaId } = req.params;

    const chamada = await prisma.chamada.findUnique({ where: { id: Number(chamadaId) } });
    if (!chamada) {
      return res.status(404).json({ error: "Chamada não encontrada." });
    }

    const cancelada = await prisma.chamada.update({
      where: { id: Number(chamadaId) },
      data: { status: "CANCELADA" },
    });

    res.json({ message: "Chamada cancelada com sucesso!", chamada: cancelada });
  } catch (error) {
    console.error("Erro ao cancelar chamada:", error);
    res.status(500).json({ error: "Erro ao cancelar chamada." });
  }
};

/**
 * 5️⃣ Listar chamadas de uma turma
 */
export const listarChamadasPorTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;

    const chamadas = await prisma.chamada.findMany({
      where: { turmaId: Number(turmaId) },
      orderBy: { dataHora: "desc" },
    });

    res.json(chamadas);
  } catch (error) {
    console.error("Erro ao listar chamadas:", error);
    res.status(500).json({ error: "Erro ao listar chamadas." });
  }
};

/**
 * 6️⃣ Detalhar chamada específica
 */
export const detalharChamada = async (req, res) => {
  try {
    const { chamadaId } = req.params;

    const chamada = await prisma.chamada.findUnique({
      where: { id: Number(chamadaId) },
      include: {
        presencas: {
          include: { aluno: true },
        },
        turma: true,
      },
    });

    if (!chamada) {
      return res.status(404).json({ error: "Chamada não encontrada." });
    }

    res.json(chamada);
  } catch (error) {
    console.error("Erro ao detalhar chamada:", error);
    res.status(500).json({ error: "Erro ao detalhar chamada." });
  }
};

/**
 * 7️⃣ Listar todas as chamadas do professor logado
 * (compatível com req.user.userId)
 */
export const listarChamadasDoProfessor = async (req, res) => {
  try {
    console.log("🔍 Dados do token JWT:", req.user); // <-- adiciona esta linha

    const userId = req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const chamadas = await prisma.chamada.findMany({
      where: {
        turma: { userId: Number(userId) },
      },
      include: {
        turma: { select: { id: true, nome: true } },
      },
      orderBy: { dataHora: "desc" },
    });

    res.json(chamadas);
  } catch (error) {
    console.error("Erro ao listar chamadas do professor:", error);
    res.status(500).json({ error: "Erro ao listar chamadas do professor." });
  }
};
