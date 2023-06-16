import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

const users = [
  {
    id: 1,
    name: 'John Doe',
    user_name: 'johndoe123',
    password: 'secretpassword',
    email: 'johndoe@example.com',
    wallet_balance: 1000,
    chat: 'Lorem ipsum dolor sit amet...',
    id_published_content: [1, 2, 3],
    id_bought_content: [4, 5, 6],
    created_at: new Date('2023-06-15'),
    created_update: new Date('2023-06-16'),
  },
];

describe('UserController', () => {
  let controller: UserController;
  const mockUserService = {
    findAll: jest.fn().mockImplementation(() => Promise.resolve({ users })),
    create: jest.fn().mockImplementation((createUserDto: CreateUserDto) => {
      const newUser = {
        id: 2,
        ...createUserDto,
      };
      users.push(newUser);
      return Promise.resolve(newUser);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a users list', async () => {
    expect(await controller.findAll()).toMatchObject({ users });
  });

  it('should create a new user', async () => {
    const newUser = {
      id: 3,
      name: 'Jane mick swagger',
      user_name: 'johndoe123',
      password: 'secretpassword',
      email: 'johndoe@example.com',
      wallet_balance: 1000,
      chat: 'Lorem ipsum dolor sit amet...',
      id_published_content: [1, 2, 3],
      id_bought_content: [4, 5, 6],
      created_at: new Date(),
      created_update: new Date(),
    };
    expect(await controller.create(newUser)).toMatchObject({
      id: expect.any(Number),
    });
  });
});
