import { PartialType } from '@nestjs/swagger';
import { ContentDto } from './create-content.dto';

export class UpdateContentDto extends PartialType(ContentDto) {}
