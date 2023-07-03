import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { Content } from '../schemas/content.schema';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { RateContentDto } from './dto/rateContent.dto';
import { UserService } from '../user/user.service';

@ApiTags('content')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly userService: UserService,
  ) {}
  //permitir que los usuarios registrados creen contenido
  @Post(':userId')
  createContent(
    @Param('userId') userId,
    @Body() contentDto: CreateContentDto,
  ): Promise<Content> {
    return this.contentService.createContent(contentDto, userId);
  }
  //permitir que los usuarios registrados vean el contenido que han creado
  @Get('user/:userId')
  findUserContent(@Param('userId') userId: string): Promise<Content[]> {
    return this.contentService.findUserContent(userId);
  }

  @Public()
  // @Roles(Role.User)
  @Get()
  findAll(@Req() req: any) {
    console.log(req.user, 'user?');
    return this.contentService.findAll();
  }
  //permitir que los usuarios registrados vean contenido por id
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }
  //permitir que los usuarios registrados actualicen contenido
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }
  //permitir que los usuarios registrados eliminen contenido
  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    return this.contentService.delete(id, token);
  }

  //permitir que los usuarios registrados compren contenido
  @Post(':id/buy/:contentId')
  async buyContent(
    @Param('id') id: string,
    @Param('contentId') contentId: string,
  ) {
    const user = await this.userService.findOne(id); // Buscar el usuario por id
    const content = await this.contentService.findOne(contentId); // Buscar el contenido por id

    if (!user) {
      // Si el usuario no existe, lanzar un error
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!content) {
      // Si el contenido no existe, lanzar un error
      throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
    }

    if (user.wallet_balance < content.price) {
      // Si el usuario no tiene suficiente dinero, lanzar un error
      throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
    }

    user.wallet_balance -= content.price; // Restar el precio del contenido de la billetera del usuario

    // Guardar los cambios en el usuario
    await user.save();
    return 'Content purchased successfully';
  }
  //permitir que los usuarios registrados vean el contenido que han comprado
  @Get(':id/boughtContent')
  getBoughtContent(@Param('id') id: string) {
    return this.contentService.getBoughtContent(id);
  }
  @Post(':id/comment')
  async addComment(@Param('id') id: string, @Body() comment: CreateCommentDto) {
    return await this.contentService.addComment(id, comment);
  }

  @Post(':id/rate')
  async rateContent(
    @Param('id') id: string,
    @Body() rateContentDto: RateContentDto,
  ): Promise<Content> {
    // Llamar a la función de validación y verificación del rating en el servicio
    if (!rateContentDto.rating || isNaN(Number(rateContentDto.rating))) {
      throw new HttpException('Invalid rating value', HttpStatus.BAD_REQUEST);
    }
    // Llamar al servicio solo si la validación es exitosa
    return this.contentService.rateContent(id, rateContentDto);
  }
}
