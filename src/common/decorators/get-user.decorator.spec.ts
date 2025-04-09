import {
  InternalServerErrorException,
  type ExecutionContext,
} from '@nestjs/common';
import { getUser } from './get-user.decorator';

jest.mock('@nestjs/common', () => ({
  createParamDecorator: jest.fn(),
  InternalServerErrorException:
    jest.requireActual('@nestjs/common').InternalServerErrorException,
}));

describe('GetUser (decorator)', () => {
  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        user: {
          id: 1,
          name: 'John Doe',
        },
      }),
    }),
  } as unknown as ExecutionContext;

  it('should return the user object', () => {
    const result = getUser(null, mockExecutionContext);

    expect(result).toEqual({
      id: 1,
      name: 'John Doe',
    });
  });

  it('should return undefined if user is not present', () => {
    const mockExecutionContextWithoutUser = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({}),
      }),
    } as unknown as ExecutionContext;

    try {
      const result = getUser(null, mockExecutionContextWithoutUser);

      expect(result).toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
