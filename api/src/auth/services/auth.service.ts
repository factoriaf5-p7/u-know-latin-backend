import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../schemas/users.schema';
import { TokenPayload } from '../../schemas/token.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(user_name: string, password: string) {
    const users: Partial<User>[] = [
      {
        user_name: 'hhh',
        password: '123',
        role: 'admin',
        id: 1,
      },
    ];

    const user: Partial<User> = users.find(
      (u: User) => u.user_name === user_name && u.password === password,
    );

    if (user) return user;

    return null;
  }

  generateToken(user: Partial<User>) {
    const payload: TokenPayload = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
