import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/auth/auth.decorator';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { User } from '@/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Get('protected')
  @Auth()
  getProtected(@GetUser() user: User) {
    return { message: 'This is a protected route', user };
  }

}
