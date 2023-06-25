import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }

  /* @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.validateUser(
      req.body as CreateUserDto,
    );
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  } */
}
