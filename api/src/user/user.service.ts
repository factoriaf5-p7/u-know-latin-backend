import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel, getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas//users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          'Email or username already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    console.log(user, 'dsdsdsd');
    if (!user) {
      throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    }
    // user.name = updateUserDto.name;
    Object.assign(user, updateUserDto);

    const updatedUser = await user.save();
    return updatedUser;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deletedUser) {
      throw new HttpException('User not Found', HttpStatus.BAD_REQUEST);
    }
    return deletedUser;
  }
}
