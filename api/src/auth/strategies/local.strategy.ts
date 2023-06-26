import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { User } from '../../schemas/users.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      passwordField: 'password',
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user: any = await this.authService.validateUser(email, password);
    console.log(user, 'sdsd')
    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
