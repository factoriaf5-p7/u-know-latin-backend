import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    }
    Object.assign(user, updateUserDto);

    const updatedUser = await user.save();
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedUser) {
      throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    }
    return deletedUser;
  }
}
