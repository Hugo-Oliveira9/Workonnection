import { Request, Response, NextFunction } from "express";
import { usuarios } from "../data/usuarios";

export function autenticarUsuario(req: Request, res: Response, next: NextFunction) {
    const email = req.headers["user-email"] as string;

    if (!email) {
        return res.status(401).json({
            message: "Usuário não autenticado."
        });
    }

    const usuarioExiste = usuarios.find(u => u.emailDadosPessoais === email);

    if (!usuarioExiste) {
        return res.status(401).json({
            message: "Usuário não encontrado."
        });
    }

    (req as any).usuario = usuarioExiste;
    
    next();
}