import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService {

    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);
        
        // verifica se o nome está preenchido
        if(!name) {
            throw new Error("Nome incorreto");
        }

        // se tiver preenchido, verifica se a tag já existe
        // no sql, findOne faz select * from tag where name = 'name'
        const tagAlreadyExists = await tagsRepositories.findOne({
            name,
        })

        // se já existir, lança erro
        if(tagAlreadyExists) {
            throw new Error("Tag já existente")
        }

        // se não existir, salva a nova tag
        const tag = tagsRepositories.create({
            name
        })

        await tagsRepositories.save(tag);

        return tag;
    }
}

export { CreateTagService }