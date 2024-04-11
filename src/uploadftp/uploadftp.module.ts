import { Module } from '@nestjs/common';
import { UploadftpService } from './uploadftp.service';
import { UploadftpController } from './uploadftp.controller';

@Module({
  controllers: [UploadftpController],
  providers: [UploadftpService],
})
export class UploadftpModule {}
