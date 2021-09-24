import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer";


class ListTagService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositories.find();

        return classToPlain(tags); // cria novos objetos a partir dos objs do typeorm
    }
}

export { ListTagService }