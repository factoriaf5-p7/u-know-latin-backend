import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';




const users = [ {
  id: 'string',
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

describe('UserService', () => {
  let service: UserService;
  const mockUserModel = {
    findAll: jest.fn().mockReturnValue(Promise.resolve(users)),
    create: jest.fn().mockImplementation((createUserDto:CreateUserDto) => {
    const newUser = {
      id: 'ObjectId',
      ...createUserDto
      };
      users.push(newUser);
      return Promise.resolve(newUser)
    }),
    update: jest
    .fn()
    .mockImplementation((userId:string,updateUserDto: UpdateUserDto) => {
      const updatedUser = {
        id: userId,
        ...updateUserDto,
      }
      const index = users.findIndex((user) => user.id === userId);
      if(index !== -1){
        users[index] = updatedUser;
        return Promise.resolve(updatedUser)
      }else{
        return Promise.resolve(null);
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,],
     })
    .overrideProvider(UserService)
    .useValue(mockUserModel)
    .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 it('should return a users list',async () => {
  expect(await service.findAll()).toMatchObject({users});
 })
 it('should creat a new user',async ()=>{
const newUser = {
  id:'string',
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
}
expect(await service.create(newUser)).toMatchObject({
  id:expect.any(String),
});
 });
 it('should update a user ',async ()=>{
  const userId = 'string';
  const updateUser: any = {name: 'Updated name'};
  expect(await service.update(userId,updateUser)).toEqual({
    id: userId,
    name: 'Updated Name',
    user_name: 'johndoe123',
      password: 'secretpassword',
      email: 'johndoe@example.com',
      wallet_balance: 1000,
      chat: 'Lorem ipsum dolor sit amet...',
      id_published_content: [1, 2, 3],
      id_bought_content: [4, 5, 6],
      created_at: new Date(),
      created_update: new Date(),
  });
 });
 it('should delete a user',async()=>{
  const userId = 'ObjectId';
  expect(await service.delete(userId)).toEqual(userId)
 });
});





