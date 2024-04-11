import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { UploadftpService } from './uploadftp.service';

@Controller('uploadftp')
export class UploadftpController {
  constructor(private readonly uploadftpService: UploadftpService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(
            null,
            file.originalname.split('.')[0] +
              '_' +
              Date.now() +
              extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Validar el tipo de archivo
    const allowedExtensions = ['.jpg', '.png', '.txt'];
    const fileExtension = extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return { error: 'El archivo debe ser de tipo jpg, png o txt' };
    }

    // Construir la URL completa del archivo cargado
    const baseUrl = `${process.env.BASE_URL}/uploads`;
    const fileUrl = join(baseUrl, file.filename);

    return {
      msg: `Archivo ${file.filename} cargado correctamente`,
      fileUrl: fileUrl,
    };
  }
}
