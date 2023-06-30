import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';

describe('AuthController', () => {
  let controller: AuthController;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: AuthService;
  const mockAuthService = {
    signUp: jest
      .fn()
      .mockReturnValue(Promise.resolve({ access_token: 'token here' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
    // service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an accessToken when a valid user is provided', async () => {
    const req = {
      body: {
        user: {
          email: 'test@mail.com',
          password: '1234',
        },
      },
    } as Request;
    expect(await controller.signup(req.body)).toMatchObject({
      accessToken: 'token here',
    });
  });
});
