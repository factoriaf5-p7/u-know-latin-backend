import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../user/user.service';
import { SignInDto } from '../dto/signin.dto';
import { User } from 'src/schemas/users.schema';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}
  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateToken(req.body);
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
