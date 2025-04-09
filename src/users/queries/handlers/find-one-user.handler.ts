import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneUserQuery } from '../impl/find-one-user.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/users/entities/user.entity';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(query: FindOneUserQuery) {
    const { id } = query;

    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
