import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { User } from '../../schemas/users.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'user_name',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const user: Partial<User> = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
