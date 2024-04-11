import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ContentDocument } from './schema/content.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name)
    private readonly contentModel: Model<ContentDocument>,
  ) {}

  async create(createContentDto: CreateContentDto) {
    const contentValid = await this.contentModel.findOne({
      name: createContentDto.name,
    });

    if (contentValid) {
      throw new ForbiddenException('Content already exists');
    }

    const content = new Content();
    content.name = createContentDto.name;
    content.front_page_url = createContentDto.front_page_url || '';
    content.img = createContentDto.img || '';
    content.url_video = createContentDto.url_video || '';
    content.url_doc_txt = createContentDto.url_doc_txt || '';
    content.credits = createContentDto.credits;
    content.theme = createContentDto.theme;
    content.created_at = new Date();
    content.updated_at = new Date();

    return await this.contentModel.create(content);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    searchQuery?: string,
    filterTheme?: string,
  ) {
    let query = {};
    if (searchQuery) {
      query = { name: { $regex: new RegExp(searchQuery, 'i') } };
    }

    if (filterTheme) {
      query = { ...query, theme: filterTheme };
    }

    const totalCount = await this.contentModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;

    const contents = await this.contentModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 })
      .exec();

    return {
      contents,
      totalPages,
      currentPage: page,
      totalCount,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    const contentValid = await this.contentModel.findById(id);
    if (!contentValid) {
      throw new Error('Content not found');
    }

    const content = {
      name: updateContentDto.name,
      front_page_url: updateContentDto.front_page_url,
      img: updateContentDto.img,
      url_video: updateContentDto.url_video,
      url_doc_txt: updateContentDto.url_doc_txt,
      credits: updateContentDto.credits,
      updated_at: new Date(),
    };

    const contentUpdated = await this.contentModel.findByIdAndUpdate(
      id,
      content,
      { new: true },
    );

    return contentUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
