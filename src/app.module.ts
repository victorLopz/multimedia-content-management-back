import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UploadftpModule } from './uploadftp/uploadftp.module';
import { ThemesModule } from './themes/themes.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    ContentModule,
    UploadftpModule,
    ThemesModule,
  ],
  controllers: [],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('content', 'products', 'themes');
  }
}
