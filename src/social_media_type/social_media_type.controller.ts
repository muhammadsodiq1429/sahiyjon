import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialMediaTypeService } from './social_media_type.service';
import { CreateSocialMediaTypeDto } from './dto/create-social_media_type.dto';
import { UpdateSocialMediaTypeDto } from './dto/update-social_media_type.dto';

@Controller('social-media-type')
export class SocialMediaTypeController {
  constructor(private readonly socialMediaTypeService: SocialMediaTypeService) {}

  @Post()
  create(@Body() createSocialMediaTypeDto: CreateSocialMediaTypeDto) {
    return this.socialMediaTypeService.create(createSocialMediaTypeDto);
  }

  @Get()
  findAll() {
    return this.socialMediaTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialMediaTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialMediaTypeDto: UpdateSocialMediaTypeDto) {
    return this.socialMediaTypeService.update(+id, updateSocialMediaTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaTypeService.remove(+id);
  }
}
