import { Command } from "@nestjs/cqrs";
import { CreateUserDto } from "@/users/dto/create-user.dto";
import { User } from "@/users/entities/user.entity";

export class CreateUserCommand extends Command<Omit<User, 'password'>> {
    constructor(
        public readonly createUserDto: CreateUserDto
    ) {
        super();
    }
}