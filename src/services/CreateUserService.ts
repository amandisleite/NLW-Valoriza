import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    async execute({ name, email, admin } : IUserRequest) {
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

        // cria novo usuário
        const user = usersRepository.create({
            name,
            email,
            admin
        })

        // salva novo usuário
        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }