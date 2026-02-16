import { Router, Request, Response } from "express";
import { vagas } from "../data/vagas";
import { Vaga } from "../types/Vaga";
import { autenticarUsuario } from "../middlewares/authUsuario";
import { randomUUID } from "crypto";

const router = Router();

//Criar vaga
router.post("/criar", autenticarUsuario, (req: Request, res: Response) => {
    const {
        empresa, cargo, descricao, modalidade, horario, beneficios, localizacao, salario, data, requisitos
    } = req.body

    if (!empresa || !cargo || !descricao) {
        return res.status(400).json({
            message: "Empresa, Cargo e Descrição são obrigatórios."
        });
    }

    const usuarioLogado = (req as any).usuario.emailDadosPessoais;

    const novaVaga: Vaga = {
        id: randomUUID(),
        empresa,
        cargo,
        descricao, 
        modalidade, 
        horario, 
        beneficios, 
        localizacao, 
        salario, 
        data,
        requisitos,
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

//Editar vagas(somente criador)
router.put("/:id", autenticarUsuario, (req: Request, res: Response)=> {
    const { id } = req.params;
    const usuarioLogado = (req as any).usuario.emailDadosPessoais;

    const vaga = vagas.find(v => v.id === id);

    if (!vaga){
        return res.status(404).json({ message: "Vaga não encontrada." });
    }

    if (vaga.criadoPor !== usuarioLogado){
        return res.status(403).json({ message: "Você não pode editar essa vaga." });
    }

    const {
        empresa, cargo, descricao, modalidade, horario, beneficios, localizacao, salario, data, requisitos
    } = req.body

    if (empresa !== undefined) vaga.empresa = empresa;
    if (cargo !== undefined) vaga.cargo = cargo;
    if (descricao !== undefined) vaga.descricao = descricao;

    if (modalidade !== undefined) vaga.modalidade = modalidade;
    if (horario !== undefined) vaga.horario = horario;
    if (beneficios !== undefined) vaga.beneficios = beneficios;
    if (localizacao !== undefined) vaga.localizacao = localizacao;
    if (salario !== undefined) vaga.salario = salario;
    if (data !== undefined) vaga.data = data;
    if (requisitos !== undefined) vaga.requisitos = requisitos;

    return res.json({
        message: "Vaga atualizada com sucesso.",
        vaga
    });
});

//Excluir vaga (somente criador)
router.delete("/:id", autenticarUsuario, (req: Request, res: Response) => {
    const { id } = req.params;
    const usuarioLogado = (req as any).usuario.emailDadosPessoais;

    const index = vagas.findIndex(v => v.id === id);

    if (index === -1){
        return res.status(404).json({ message: "Vaga não encontrada." })
    }

    if (vagas[index].criadoPor !== usuarioLogado){
        return res.status(403).json({ message: "Você não pode excluir essa vaga." });
    }

    const vagaRemovida = vagas.splice(index, 1)[0];

    return res.json({
        message: "Vaga excluída com sucesso.",
        vaga: vagaRemovida
    });
});

export default router;