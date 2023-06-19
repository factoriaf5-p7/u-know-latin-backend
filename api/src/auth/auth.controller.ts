import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    console.log(user);
    return this.authService.createUser(user);
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
