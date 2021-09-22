import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

// autenticar com e-mail e senha
class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        // verificar se e-mail existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("E-mail ou Senha incorretos")
        }

        // verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("E-mail ou Senha incorretos")
        }

        // gerar token pra autenticação
        const token = sign({
            email: user.email,
        }, "6425ddbf9cd648e1e4d33c4340d3373d", {
            subject: user.id,
            expiresIn: "1d"
        }
        );

        return token;

    }
}

export { AuthenticateUserService }