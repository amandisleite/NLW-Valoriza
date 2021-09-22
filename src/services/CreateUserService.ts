import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({ name, email, admin = false, password } : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

         // verifica se e-mail tá preenchido
        if(!email) {
            throw new Error("e-mail incorreto");
        }

        // verifica se e-mail já existe
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        // se existir, mostra um erro (lança exceção)
        if (userAlreadyExists) {
            throw new Error("usuário já existe");
        }

        // criptografou a senha
        const passwordHash = await hash(password, 8); 

        // cria novo usuário
        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        // salva novo usuário
        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }