import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from '@/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/common/services/encryption.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { createUserDto } = command;
    const { email, password, username } = createUserDto;

    const user = this.userRepository.create({
      email,
      password: await this.encryptionService.hashPassword(password),
      username,
    });

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }
}
