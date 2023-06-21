import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    Object.assign(updateUserDto);

    const updatedUser = await this.userModel
      .findByIdAndUpdate({ _id: id })
      .exec();
     console.log(updatedUser)
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}

/* @Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.UserModel.find();
  }

  async findOne(id: number) {
    return this.UserModel.findOne({ _id: id }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} hola mundo`;
  }
}
 */
