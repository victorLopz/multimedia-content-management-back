import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Theme } from './entities/theme.entity';
import { Model } from 'mongoose';
import { ThemeDocument } from './schema/theme.schema';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name)
    private readonly themeModel: Model<ThemeDocument>,
  ) {}

  async create(createThemeDto: CreateThemeDto) {
    const themeValid = await this.themeModel.findOne({
      name: createThemeDto.name,
    });

    if (themeValid) {
      throw new ForbiddenException('Theme already exists');
    }

    const theme = new CreateThemeDto();
    theme.name = createThemeDto.name;
    theme.allow_images = createThemeDto.allow_images;
    theme.allow_videos_url = createThemeDto.allow_videos_url;
    theme.allow_doctxt_url = createThemeDto.allow_doctxt_url;
    theme.created_at = new Date();
    theme.updated_at = new Date();

    try {
      const themeCreated = await this.themeModel.create(theme);
      return themeCreated;
    } catch (e) {
      console.log('Error creating theme', e);
      throw new BadRequestException('Error creating theme');
    }
  }

  async findAll(page: number = 1, limit: number = 10, searchQuery?: string) {
    let query = {};
    if (searchQuery) {
      query = { name: { $regex: new RegExp(searchQuery, 'i') } };
    }

    const totalCount = await this.themeModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;

    const themes = await this.themeModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 })
      .exec();

    return {
      themes,
      totalPages,
      currentPage: page,
      totalCount,
    };
  }

  async findAllNoPagination() {
    const themes = await this.themeModel.find();
    return themes;
  }

  async update(id: string, updateThemeDto: UpdateThemeDto) {
    const themeValid = await this.themeModel.findOne({ _id: id });
    if (!themeValid) {
      throw new BadRequestException('Theme not found');
    }

    const theme = new Theme();
    theme.name = updateThemeDto.name;
    theme.allow_images = updateThemeDto.allow_images;
    theme.allow_videos_url = updateThemeDto.allow_videos_url;
    theme.allow_doctxt_url = updateThemeDto.allow_doctxt_url;
    theme.updated_at = new Date();

    const themeUpdated = await this.themeModel.findByIdAndUpdate(id, theme, {
      new: true,
    });

    return themeUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} theme`;
  }
}
