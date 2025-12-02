// controllers/grupoController.js
import prisma from "../utils/prismaClient.js";

/**
 * 1️⃣ Criar novo grupo de alunos
 */
export const criarGrupo = async (req, res) => {
  try {
    const { nome, turmaId, alunosIds } = req.body;

    if (!nome || !turmaId) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    // Verifica se a turma existe
    const turma = await prisma.turma.findUnique({ where: { id: Number(turmaId) } });
    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    // Verifica se os alunos pertencem à turma
    let connectAlunos = [];
    if (Array.isArray(alunosIds) && alunosIds.length > 0) {
      const alunosValidos = await prisma.aluno.findMany({
        where: { id: { in: alunosIds }, turmaId: Number(turmaId) },
      });

      if (alunosValidos.length !== alunosIds.length) {
        return res
          .status(400)
          .json({ error: "Um ou mais alunos não pertencem a esta turma." });
      }

      connectAlunos = alunosIds.map((id) => ({ id }));
    }

    // Cria o grupo
    const grupo = await prisma.grupo.create({
      data: {
        nome,
        turmaId: Number(turmaId),
        alunos: { connect: connectAlunos },
      },
      include: { alunos: true },
    });

    res.status(201).json({ message: "Grupo criado com sucesso!", grupo });
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    res.status(500).json({ error: "Erro ao criar grupo." });
  }
};

/**
 * 2️⃣ Listar grupos de uma turma
 */
export const listarGruposPorTurma = async (req, res) => {
  try {
    const { turmaId } = req.params;

    const grupos = await prisma.grupo.findMany({
      where: { turmaId: Number(turmaId) },
      include: { alunos: true },
      orderBy: { criadoEm: "asc" },
    });

    res.json(grupos);
  } catch (error) {
    console.error("Erro ao listar grupos:", error);
    res.status(500).json({ error: "Erro ao listar grupos." });
  }
};

/**
 * 3️⃣ Atualizar nome do grupo
 */
export const atualizarGrupo = async (req, res) => {
  try {
    const { grupoId } = req.params;
    const { nome } = req.body;

    const grupo = await prisma.grupo.findUnique({ where: { id: Number(grupoId) } });
    if (!grupo) {
      return res.status(404).json({ error: "Grupo não encontrado." });
    }

    const atualizado = await prisma.grupo.update({
      where: { id: Number(grupoId) },
      data: { nome },
    });

    res.json({ message: "Grupo atualizado com sucesso!", grupo: atualizado });
  } catch (error) {
    console.error("Erro ao atualizar grupo:", error);
    res.status(500).json({ error: "Erro ao atualizar grupo." });
  }
};

/**
 * 4️⃣ Adicionar alunos a um grupo
 */
export const adicionarAlunosAoGrupo = async (req, res) => {
  try {
    const { grupoId } = req.params;
    const { alunosIds } = req.body;

    const grupo = await prisma.grupo.findUnique({
      where: { id: Number(grupoId) },
      include: { turma: true },
    });
    if (!grupo) return res.status(404).json({ error: "Grupo não encontrado." });

    // Garante que os alunos pertencem à mesma turma
    const alunosValidos = await prisma.aluno.findMany({
      where: { id: { in: alunosIds }, turmaId: grupo.turmaId },
    });
    if (alunosValidos.length !== alunosIds.length) {
      return res
        .status(400)
        .json({ error: "Um ou mais alunos não pertencem a esta turma." });
    }

    const atualizado = await prisma.grupo.update({
      where: { id: Number(grupoId) },
      data: {
        alunos: {
          connect: alunosIds.map((id) => ({ id })),
        },
      },
      include: { alunos: true },
    });

    res.json({ message: "Alunos adicionados ao grupo!", grupo: atualizado });
  } catch (error) {
    console.error("Erro ao adicionar alunos ao grupo:", error);
    res.status(500).json({ error: "Erro ao adicionar alunos." });
  }
};

/**
 * 5️⃣ Remover um aluno de um grupo
 */
export const removerAlunoDoGrupo = async (req, res) => {
  try {
    const { grupoId, alunoId } = req.params;

    const grupo = await prisma.grupo.findUnique({ where: { id: Number(grupoId) } });
    if (!grupo) return res.status(404).json({ error: "Grupo não encontrado." });

    await prisma.grupo.update({
      where: { id: Number(grupoId) },
      data: {
        alunos: {
          disconnect: { id: Number(alunoId) },
        },
      },
    });

    res.json({ message: "Aluno removido do grupo com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover aluno do grupo:", error);
    res.status(500).json({ error: "Erro ao remover aluno do grupo." });
  }
};

/**
 * 6️⃣ Excluir grupo
 */
export const excluirGrupo = async (req, res) => {
  try {
    const { grupoId } = req.params;

    const grupo = await prisma.grupo.findUnique({ where: { id: Number(grupoId) } });
    if (!grupo) return res.status(404).json({ error: "Grupo não encontrado." });

    await prisma.grupo.delete({ where: { id: Number(grupoId) } });

    res.json({ message: "Grupo excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir grupo:", error);
    res.status(500).json({ error: "Erro ao excluir grupo." });
  }
};

