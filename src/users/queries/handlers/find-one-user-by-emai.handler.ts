import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOneUserByEmailQuery } from "../impl/find-one-user-by-email";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@/users/entities/user.entity";
import { Repository } from "typeorm";

@QueryHandler(FindOneUserByEmailQuery)
export class FindOneUserByEmailHandler implements IQueryHandler<FindOneUserByEmailQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
) {}

  async execute(query: FindOneUserByEmailQuery) {
    const { email } = query;
    
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
