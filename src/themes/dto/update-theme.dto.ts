import { PartialType } from '@nestjs/swagger';
import { CreateThemeDto } from './create-theme.dto';

import { IsDate, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateThemeDto extends PartialType(CreateThemeDto) {
  @IsNotEmpty()
  name: string;

  allow_images: boolean;
  allow_videos_url: boolean;
  allow_doctxt_url: boolean;

  @ValidateIf((o) => o.updatedAt !== undefined)
  @IsDate()
  updated_at: Date;
}
