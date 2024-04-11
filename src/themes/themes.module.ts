import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Theme } from './entities/theme.entity';
import { ThemeSchema } from './schema/theme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Theme.name,
        schema: ThemeSchema,
      },
    ]),
  ],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
