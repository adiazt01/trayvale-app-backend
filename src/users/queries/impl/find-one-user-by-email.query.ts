import { User } from '@/users/entities/user.entity';
import { Query } from '@nestjs/cqrs';

export class FindOneUserByEmailQuery extends Query<User> {
  constructor(public readonly email: string) {
    super();
  }
}
