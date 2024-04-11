import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from 'src/utils/common/roles.enum';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(new RolesGuard([Roles.ADMIN, Roles.CREATOR]))
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  @UseGuards(new RolesGuard([Roles.ADMIN, Roles.CREATOR, Roles.READER]))
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') searchQuery?: string,
    @Query('filter') filterTheme?: string,
  ) {
    return this.contentService.findAll(page, limit, searchQuery, filterTheme);
  }

  @Get(':id')
  @UseGuards(new RolesGuard([Roles.ADMIN, Roles.CREATOR, Roles.READER]))
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(new RolesGuard([Roles.ADMIN, Roles.CREATOR]))
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete(':id')
  @UseGuards(new RolesGuard([Roles.ADMIN]))
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
