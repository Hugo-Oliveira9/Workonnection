import { Router, Request, Response } from "express";
import { usuarios } from "../data/usuarios";
import { Usuario } from "../types/Usuario";

const router = Router();

// CADASTRO
router.post("/cadastro", (req: Request, res: Response) => {
  const dados: Usuario = req.body as Usuario;

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
    message: "Cadastro realizado com sucesso",
    nome: dados.nomeDadosPessoais,
    email: dados.emailDadosPessoais
  });
});

// LOGIN
router.post("/login", (req: Request, res: Response) => {
  const { emailDadosPessoais, senhaDadosPessoais } = req.body;

  if (!emailDadosPessoais || !senhaDadosPessoais) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios."
    });
  }

  const usuario = usuarios.find(
    (u) => 
      u.emailDadosPessoais === emailDadosPessoais &&
      u.senhaDadosPessoais === senhaDadosPessoais
  );

  if (!usuario) {
    return res.status(401).json({
      message: "Email ou senha inválidos."
    });
  }

  return res.json({
    message: "Login realizado com sucesso",
    nome: usuario.nomeDadosPessoais,
    email: usuario.emailDadosPessoais,
    tipoUsuario: usuario.tipoUsuario
  });
});

export default router;
