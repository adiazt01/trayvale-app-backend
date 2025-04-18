import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { User } from './entities/user.entity';
import { FindOneUserByEmailQuery } from './queries/impl/find-one-user-by-email.query';
import { FindOneUserQuery } from './queries/impl/find-one-user.query';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);

    try {
      const user = await this.commandBus.execute(
        new CreateUserCommand(createUserDto),
      );

      this.logger.log(`User created successfully: ${user.email}`);

      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);

      throw new InternalServerErrorException(
        'An error occurred while creating the user',
      );
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.queryBus.execute(new FindOneUserQuery(id));

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack);

      throw new InternalServerErrorException(
        'An error occurred while finding the user',
      );
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.queryBus.execute(
        new FindOneUserByEmailQuery(email),
      );

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack);

      throw new InternalServerErrorException(
        'An error occurred while finding the user',
      );
    }
  }
}
