import { PartialType } from '@nestjs/swagger';
import { CreateUploadftpDto } from './create-uploadftp.dto';

export class UpdateUploadftpDto extends PartialType(CreateUploadftpDto) {}
