import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.create(createUserDto);
    
    return {
      user: newUser,
      token: this.getJwtToken({ email: newUser.email, id: newUser.id, username: newUser.username }),
    }
  }

  private getJwtToken(payload: JwtPayload) {
    try {
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException('Error generating JWT token');
    }
  }
}
