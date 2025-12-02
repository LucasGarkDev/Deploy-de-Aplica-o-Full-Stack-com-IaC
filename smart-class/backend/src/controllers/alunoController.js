// controllers/alunoController.js
import prisma from "../utils/prismaClient.js";

/**
 * 1️⃣ Listar alunos de uma turma
 */
export const listarAlunos = async (req, res) => {
  try {
    const { turmaId } = req.params;

    const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    const alunos = await prisma.aluno.findMany({
      where: { turmaId: Number(turmaId) },
      orderBy: { nome: "asc" },
    });

    res.json(alunos);
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    res.status(500).json({ error: "Erro ao listar alunos." });
  }
};

/**
 * 2️⃣ Criar novo aluno em uma turma
 */
export const criarAluno = async (req, res) => {
  try {
    const { turmaId } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    const aluno = await prisma.aluno.create({
      data: { nome, turmaId: Number(turmaId) },
    });

    res.status(201).json({ message: "Aluno criado com sucesso!", aluno });
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Erro ao criar aluno." });
  }
};

/**
 * 3️⃣ Atualizar nome do aluno
 */
export const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
    }

    const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    const atualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: { nome },
    });

    res.json({ message: "Aluno atualizado com sucesso!", aluno: atualizado });
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Erro ao atualizar aluno." });
  }
};

/**
 * 4️⃣ Excluir aluno
 */
export const excluirAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    await prisma.aluno.delete({ where: { id: Number(id) } });

    res.json({ message: "Aluno excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res.status(500).json({ error: "Erro ao excluir aluno." });
  }
};
