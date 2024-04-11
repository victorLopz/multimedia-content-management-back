import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsIn,
} from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @MinLength(3)
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsIn(['Reader', 'Creator', 'Admin'], { each: true })
  roles: string[];
}
