import { IsDate, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  name: string;

  allow_images: boolean;
  allow_videos_url: boolean;
  allow_doctxt_url: boolean;

  @ValidateIf((o) => o.createdAt !== undefined)
  @IsDate()
  created_at: Date;

  @ValidateIf((o) => o.updatedAt !== undefined)
  @IsDate()
  updated_at: Date;
}
