import { Router, Request, Response } from "express";
import { Usuario } from "../types/Usuario";

const router = Router();

// "Banco" em memória
const usuarios: Usuario[] = [];

// Rota de cadastro
router.post("/cadastro", (req: Request, res: Response) => {
  const dados: Usuario = req.body;

  if (!dados.emailDadosPessoais || !dados.senhaDadosPessoais) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios."
    });
  }

  const jaExiste = usuarios.find(
    (u) => u.emailDadosPessoais === dados.emailDadosPessoais
  );

  if (jaExiste) {
    return res.status(400).json({
      message: "Usuário já cadastrado com esse email."
    });
  }

  usuarios.push(dados);

  console.log("Usuários cadastrados:", usuarios);

  return res.status(201).json({
    message: "Cadastro realizado com sucesso"
  });
});

// Rota de login
router.post("/login", (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios."
    });
  }

  const usuario = usuarios.find(
    (u) => u.emailDadosPessoais === email
  );

  if (!usuario) {
    return res.status(401).json({
      message: "Usuário não encontrado."
    });
  }

  if (usuario.senhaDadosPessoais !== senha) {
    return res.status(401).json({
      message: "Email ou senha inválidos."
    });
  }

  return res.json({
    message: "Login realizado com sucesso",
    nome: usuario.nomeDadosPessoais,
    email: usuario.emailDadosPessoais
  });
});

export default router;
