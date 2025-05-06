import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Media } from "./models/media.model";

@Injectable()
export class MediaService {
  constructor(@InjectModel(Media) private readonly mediaModel: typeof Media) {}

  async create(createMediaDto: CreateMediaDto) {
    const newMedia = await this.mediaModel.create(createMediaDto);

    return { message: "Media successfully added", newMedia };
  }

  async findAll() {
    const allMedia = await this.mediaModel.findAll({ include: { all: true } });

    if (allMedia.length === 0) throw new NotFoundException("Media not found");

    return allMedia;
  }

  async findOne(id: number) {
    const media = await this.mediaModel.findByPk(id);

    if (!media) throw new NotFoundException("Media not found");

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.findOne(id);
    await media.update(updateMediaDto);

    return { message: "Media successfully updated", media };
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    await media.destroy();

    return { message: "Media successfully deleted", id };
  }
}
