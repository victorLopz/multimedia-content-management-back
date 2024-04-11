import { Injectable } from '@nestjs/common';
import { CreateUploadftpDto } from './dto/create-uploadftp.dto';
import { UpdateUploadftpDto } from './dto/update-uploadftp.dto';

@Injectable()
export class UploadftpService {
  create(createUploadftpDto: CreateUploadftpDto) {
    return 'This action adds a new uploadftp';
  }

  findAll() {
    return `This action returns all uploadftp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadftp`;
  }

  update(id: number, updateUploadftpDto: UpdateUploadftpDto) {
    return `This action updates a #${id} uploadftp`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadftp`;
  }
}
