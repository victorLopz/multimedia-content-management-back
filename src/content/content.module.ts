import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Content } from './entities/content.entity';
import { ContentSchema } from './schema/content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Content.name,
        schema: ContentSchema,
      },
    ]),
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
