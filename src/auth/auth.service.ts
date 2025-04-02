import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { EncryptionService } from 'src/common/services/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) { }

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.create(createUserDto);
    
    return {
      ...newUser,
      token: this.getJwtToken({ email: newUser.email, id: newUser.id, username: newUser.username }),
    }
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const userFound = await this.usersService.findOneByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.encryptionService.comparePasswords(
      password,
      userFound.password,
    );

    if (!userFound || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      ...userFound,
      token: this.getJwtToken({ email: userFound.email, id: userFound.id, username: userFound.username }),
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
