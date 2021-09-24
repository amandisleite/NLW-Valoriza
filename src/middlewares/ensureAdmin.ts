import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRepositories.findOne(user_id);

    // verificar se usuário é admin
    
    if(admin) {
        return next();
    }

    // status 401: não autorizado
    return response.status(401).json({
        error: "usuário não tem autorização",
    });
}