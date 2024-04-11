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
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/utils/common/roles.enum';

@ApiTags('themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseGuards(new RolesGuard([Roles.ADMIN]))
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
  }

  @Get()
  @UseGuards(new RolesGuard([Roles.ADMIN]))
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') searchQuery?: string,
  ) {
    return this.themesService.findAll(page, limit, searchQuery);
  }

  @Patch(':id')
  @UseGuards(new RolesGuard([Roles.ADMIN]))
  update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto) {
    return this.themesService.update(id, updateThemeDto);
  }

  @Get('all')
  @UseGuards(new RolesGuard([Roles.ADMIN, Roles.CREATOR, Roles.READER]))
  async findAllNoPagination() {
    return this.themesService.findAllNoPagination();
  }

  @Delete(':id')
  @UseGuards(new RolesGuard([Roles.ADMIN]))
  remove(@Param('id') id: string) {
    return this.themesService.remove(+id);
  }
}
