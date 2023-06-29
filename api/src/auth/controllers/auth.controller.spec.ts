import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Request } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const createUserDto: any = {
        // Provide the necessary properties for creating a user
        // Replace these with the actual user data for testing
        user_name: 'testuser',
        password: 'testpassword',
      };

      const createdUser: CreateUserDto = {
        id: '1',
        name: 'John Doe',
        user_name: 'johndoe',
        password: 'password123',
        email: 'johndoe@example.com',
        wallet_balance: 100,
        chat: 'Hello, World!',
        id_published_content: [1, 2, 3],
        id_bought_content: [4, 5],
        created_at: new Date(),
        created_update: new Date(),
      };
      

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser as any);

      const result = await authController.signup(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toBe(createdUser);
    });
  });

  describe('login', () => {
    it('should generate a token for the authenticated user', async () => {
      // Create a mock Request object
      const req: any = {
        get: jest.fn(),
        header: jest.fn(),
        accepts: jest.fn(),
        acceptsCharsets: jest.fn(),
        // ... add other required properties and methods here
        user: {
          id: 1,
          username: 'johndoe',
        },
      };
      const generatedToken = {
        access_token: 'sdsdsdsd',
      } // Replace with the expected generated token

      jest.spyOn(authService, 'generateToken').mockReturnValue(generatedToken);

      const result = await authController.login(req);

      expect(authService.generateToken).toHaveBeenCalledWith(req.user);
      expect(result).toBe(generatedToken);
    });
  });
});
