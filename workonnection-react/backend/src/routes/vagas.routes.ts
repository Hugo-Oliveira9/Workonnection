import { Router, Request, Response } from "express";
import { vagas } from "../data/vagas";
import { Vaga } from "../types/Vaga";
import { autenticarUsuario } from "../middlewares/authUsuario";

const router = Router();

//Criar vaga
router.post("/criar", autenticarUsuario, (req: Request, res: Response) => {
    const dados: Vaga = req.body;

    if (!dados.empresa || !dados.cargo || !dados.descricao) {
        return res.status(400).json({
            message: "Empresa, Cargo e Descrição são obrigatórios."
        });
    }

    const usuarioLogado = (req as any).usuario.emailDadosPessoais;

    const novaVaga = {
        ...dados,
        criadoPor: usuarioLogado
    };

    vagas.push(novaVaga);

    return res.status(201).json({
        message: "Vaga criada com sucesso.",
        vaga: novaVaga
    });
});

//Listar vagas
router.get("/", (req: Request, res: Response) => {
    return res.json(vagas);
});

export default router;