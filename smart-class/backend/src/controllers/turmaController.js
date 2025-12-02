// controllers/turmaController.js
import prisma from "../utils/prismaClient.js";

/**
 * 1️⃣ Listar todas as turmas do professor logado
 */
export const listarTurmas = async (req, res) => {
  try {
    const userId = req.user.userId;

    const turmas = await prisma.turma.findMany({
      where: { userId },
      include: {
        _count: {
          select: { alunos: true, grupos: true, chamadas: true },
        },
      },
      orderBy: { criadoEm: "asc" },
    });

    res.json(turmas);
  } catch (error) {
    console.error("Erro ao listar turmas:", error);
    res.status(500).json({ error: "Erro ao listar turmas." });
  }
};

/**
 * 2️⃣ Criar nova turma
 */
export const criarTurma = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    const turma = await prisma.turma.create({
      data: { nome, userId },
    });

    res.status(201).json({ message: "Turma criada com sucesso!", turma });
  } catch (error) {
    console.error("Erro ao criar turma:", error);
    res.status(500).json({ error: "Erro ao criar turma." });
  }
};

/**
 * 3️⃣ Atualizar nome da turma
 */
export const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    const atualizada = await prisma.turma.update({
      where: { id: Number(id) },
      data: { nome },
    });

    res.json({ message: "Turma atualizada com sucesso!", turma: atualizada });
  } catch (error) {
    console.error("Erro ao atualizar turma:", error);
    res.status(500).json({ error: "Erro ao atualizar turma." });
  }
};

/**
 * 4️⃣ Excluir turma (com remoção associada de alunos, grupos e chamadas)
 */
export const excluirTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const turmaId = Number(id);

    const turma = await prisma.turma.findUnique({ where: { id: turmaId } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    // Exclui dependências manualmente (garante integridade)
    await prisma.presenca.deleteMany({
      where: { chamada: { turmaId } },
    });

    await prisma.chamada.deleteMany({ where: { turmaId } });
    await prisma.grupo.deleteMany({ where: { turmaId } });
    await prisma.aluno.deleteMany({ where: { turmaId } });

    await prisma.turma.delete({ where: { id: turmaId } });

    res.json({ message: "Turma e dados relacionados excluídos com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir turma:", error);
    res.status(500).json({ error: "Erro ao excluir turma." });
  }
};

/**
 * 5️⃣ Listar alunos de uma turma específica
 */
export const listarAlunosDaTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: { alunos: true },
    });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    res.json(turma.alunos);
  } catch (error) {
    console.error("Erro ao listar alunos da turma:", error);
    res.status(500).json({ error: "Erro ao listar alunos da turma." });
  }
};

/**
 * 6️⃣ Criar novo aluno em uma turma
 */
export const criarAlunoNaTurma = async (req, res) => {
  try {
    const { id } = req.params; // id da turma
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    // Verifica se a turma existe
    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    // Cria o aluno vinculado à turma
    const novoAluno = await prisma.aluno.create({
      data: {
        nome,
        turmaId: Number(id),
      },
    });

    res.status(201).json({ message: "Aluno criado com sucesso!", aluno: novoAluno });
  } catch (error) {
    console.error("Erro ao criar aluno na turma:", error);
    res.status(500).json({ error: "Erro ao criar aluno na turma." });
  }
};

/**
 * 7️⃣ Listar grupos de uma turma
 */
export const listarGruposDaTurma = async (req, res) => {
  try {
    const { id } = req.params;

    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: { grupos: true },
    });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    res.json(turma.grupos);
  } catch (error) {
    console.error("Erro ao listar grupos da turma:", error);
    res.status(500).json({ error: "Erro ao listar grupos da turma." });
  }
};

/**
 * 8️⃣ Criar grupo dentro de uma turma
 */
export const criarGrupoNaTurma = async (req, res) => {
  try {
    const { id } = req.params; // turmaId
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    const turma = await prisma.turma.findUnique({ where: { id: Number(id) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    const novoGrupo = await prisma.grupo.create({
      data: { nome, turmaId: Number(id) },
    });

    res.status(201).json({ message: "Grupo criado com sucesso!", grupo: novoGrupo });
  } catch (error) {
    console.error("Erro ao criar grupo na turma:", error);
    res.status(500).json({ error: "Erro ao criar grupo na turma." });
  }
};