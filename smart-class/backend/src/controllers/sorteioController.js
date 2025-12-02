// controllers/sorteioController.js
import prisma from "../utils/prismaClient.js";

/**
 * 1️⃣ Sorteia um aluno ou grupo de uma turma
 */
export const sortear = async (req, res) => {
  try {
    const { tipo, turmaId } = req.params;

    if (!tipo || !turmaId) {
      return res.status(400).json({ error: "Parâmetros 'tipo' e 'turmaId' são obrigatórios." });
    }

    const turma = await prisma.turma.findUnique({
      where: { id: Number(turmaId) },
    });

    if (!turma) {
      return res.status(404).json({ error: "Turma não encontrada." });
    }

    // 🔹 Sorteio de aluno
    if (tipo === "aluno") {
      const alunos = await prisma.aluno.findMany({
        where: { turmaId: Number(turmaId) },
        orderBy: { nome: "asc" },
      });

      if (alunos.length === 0) {
        return res.status(404).json({ error: "Nenhum aluno encontrado nesta turma." });
      }

      const escolhido = alunos[Math.floor(Math.random() * alunos.length)];
      return res.json({
        message: "Aluno sorteado com sucesso!",
        tipo: "aluno",
        resultado: { id: escolhido.id, nome: escolhido.nome },
      });
    }

    // 🔹 Sorteio de grupo
    else if (tipo === "grupo") {
      const grupos = await prisma.grupo.findMany({
        where: { turmaId: Number(turmaId) },
        orderBy: { nome: "asc" },
      });

      if (grupos.length === 0) {
        return res.status(404).json({ error: "Nenhum grupo encontrado nesta turma." });
      }

      const escolhido = grupos[Math.floor(Math.random() * grupos.length)];
      return res.json({
        message: "Grupo sorteado com sucesso!",
        tipo: "grupo",
        resultado: { id: escolhido.id, nome: escolhido.nome },
      });
    }

    // 🔹 Caso tipo inválido
    else {
      return res.status(400).json({
        error: "Tipo inválido. Use 'aluno' ou 'grupo' como parâmetro.",
      });
    }
  } catch (error) {
    console.error("Erro ao realizar sorteio:", error);
    res.status(500).json({ error: "Erro interno ao realizar sorteio." });
  }
};
