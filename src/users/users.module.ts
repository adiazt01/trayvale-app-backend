import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { commandHandlers } from './commands/handlers';
import { EncryptionService } from 'src/common/services/encryption.service';
import { queriesHandlers } from './queries/handlers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [
    UsersService, 
    EncryptionService,
    ...commandHandlers,
    ...queriesHandlers
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
