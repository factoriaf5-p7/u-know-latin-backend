import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/schemas/users.schema';
/* import { JwtService } from '@nestjs/jwt'; */
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return createdUser.save();
  }
  /* async validateUser(loggedUser: LoginDto) {
    try {
      const user = (await this.userService.findByEmail(
        loggedUser.email,
      )) as User;
      if (await this.verifyPassword(loggedUser.password, user.password))
        return {
          accessToken: await this.jwtService.signAsync({ email: user.email }),
        };

      throw new UnauthorizedException();
      // console.log('user correcto');
      //todo generate token
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  } */
}
