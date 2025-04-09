import { JwtPayload } from './jwt-payload.interface';

describe('jwt-payload (interface)', () => {
  it('should have the correct properties', () => {
    const JwtPayload: JwtPayload = {
      email: 'test@example.com',
      id: 1,
      username: 'testuser',
      aud: 'test-audience',
      exp: 1234567890,
      iat: 1234567890,
      iss: 'test-issuer',
    };

    expect(JwtPayload).toHaveProperty('email');
    expect(JwtPayload).toHaveProperty('id');
    expect(JwtPayload).toHaveProperty('username');
    expect(JwtPayload).toHaveProperty('aud');
    expect(JwtPayload).toHaveProperty('exp');
    expect(JwtPayload).toHaveProperty('iat');
    expect(JwtPayload).toHaveProperty('iss');
  });
});
