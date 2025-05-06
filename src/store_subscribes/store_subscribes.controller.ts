import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSubscribesService } from './store_subscribes.service';
import { CreateStoreSubscribeDto } from './dto/create-store_subscribe.dto';
import { UpdateStoreSubscribeDto } from './dto/update-store_subscribe.dto';

@Controller('store-subscribes')
export class StoreSubscribesController {
  constructor(private readonly storeSubscribesService: StoreSubscribesService) {}

  @Post()
  create(@Body() createStoreSubscribeDto: CreateStoreSubscribeDto) {
    return this.storeSubscribesService.create(createStoreSubscribeDto);
  }

  @Get()
  findAll() {
    return this.storeSubscribesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSubscribesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
    return this.storeSubscribesService.update(+id, updateStoreSubscribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSubscribesService.remove(+id);
  }
}
