import { IsDate, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  name: string;

  front_page_url: string;

  img: string;
  url_video: string;
  url_doc_txt: string;

  @IsNotEmpty()
  credits: string;

  @IsNotEmpty()
  theme: string;

  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsDate()
  created_at: Date;

  @ValidateIf((object, value) => value !== null && value !== undefined)
  @IsDate()
  updated_at: Date;

  constructor() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
