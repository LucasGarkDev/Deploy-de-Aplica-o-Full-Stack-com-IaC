// controllers/authController.js
import bcrypt from "bcrypt";
import prisma from "../utils/prismaClient.js";
import { gerarToken } from "../utils/jwt.js";

/**
 * 1️⃣ Registrar novo usuário (professor)
 */
export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha)
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: "E-mail inválido." });

    if (senha.length < 6)
      return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });

    const existente = await prisma.user.findUnique({ where: { email } });
    if (existente)
      return res.status(409).json({ error: "Já existe um usuário com este e-mail." });

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: { nome, email, senhaHash },
    });

    delete user.senhaHash;

    const token = gerarToken({ userId: user.id });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user,
      token,
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ error: "Erro interno ao registrar usuário." });
  }
};


/**
 * 2️⃣ Login do usuário
 */
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    // Busca o usuário pelo e-mail
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Valida a senha
    const senhaOk = await bcrypt.compare(senha, user.senhaHash);
    if (!senhaOk) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gera token JWT
    const token = gerarToken({ userId: user.id });

    res.json({
      message: "Login bem-sucedido!",
      token,
      user: { id: user.id, nome: user.nome, email: user.email },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno ao realizar login." });
  }
};
