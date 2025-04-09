import { plainToClass } from 'class-transformer';
import { LoginUserDto } from './login-user.dto';
import { validate } from 'class-validator';

describe('LoginUser (dto)', () => {
  it('should have the correct properties', () => {
    const dto = plainToClass(LoginUserDto, {
      email: 'test@example.com',
      password: 'Craft123*',
    });

    expect(dto).toBeInstanceOf(LoginUserDto);
    expect(dto).toHaveProperty('email');
    expect(dto).toHaveProperty('password');
  });

  it('should validate email and password', async () => {
    const dto = plainToClass(LoginUserDto, {
      email: 'example',
      password: 'example',
    });

    const errors = await validate(dto);

    expect(errors[0].constraints).toEqual({
      isEmail: 'email must be an email',
    });

    expect(errors[1].constraints).toEqual({
      isStrongPassword: 'password is not strong enough',
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate strong password', async () => {
    const dto = plainToClass(LoginUserDto, {
      email: 'test@example.com',
      password: 'weakpass',
    });

    const errors = await validate(dto);

    expect(errors[0].constraints).toEqual({
      isStrongPassword: 'password is not strong enough',
    });
  });
});
