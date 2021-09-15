import { Request, Response, NextFunction} from "express";

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    // verificar se usuário é admin
    const admin = true;

    if(admin) {
        return next();
    }

    // status 401: não autorizado
    return response.status(401).json({
        error: "usuário não tem autorização",
    });
}