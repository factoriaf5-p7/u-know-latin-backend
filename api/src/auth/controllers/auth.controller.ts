import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../../user/user.service';
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
}
