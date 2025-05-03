import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSocialLinksService } from './store_social_links.service';
import { CreateStoreSocialLinkDto } from './dto/create-store_social_link.dto';
import { UpdateStoreSocialLinkDto } from './dto/update-store_social_link.dto';

@Controller('store-social-links')
export class StoreSocialLinksController {
  constructor(private readonly storeSocialLinksService: StoreSocialLinksService) {}

  @Post()
  create(@Body() createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    return this.storeSocialLinksService.create(createStoreSocialLinkDto);
  }

  @Get()
  findAll() {
    return this.storeSocialLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSocialLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {
    return this.storeSocialLinksService.update(+id, updateStoreSocialLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSocialLinksService.remove(+id);
  }
}
