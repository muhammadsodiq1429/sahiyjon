import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSocialMediaTypeDto } from "./dto/create-social_media_type.dto";
import { UpdateSocialMediaTypeDto } from "./dto/update-social_media_type.dto";
import { InjectModel } from "@nestjs/sequelize";
import { SocialMediaType } from "../social_media_type/models/social_media_type.model";

@Injectable()
export class SocialMediaTypeService {
  constructor(
    @InjectModel(SocialMediaType)
    private readonly social_media_typeModel: typeof SocialMediaType
  ) {}
  async create(createSocialMediaTypeDto: CreateSocialMediaTypeDto) {
    const newSocialMediaType = await this.social_media_typeModel.create(
      createSocialMediaTypeDto
    );

    return newSocialMediaType;
  }

  async findAll() {
    const allSocialMediaType = await this.social_media_typeModel.findAll({
      include: { all: true },
    });

    if (allSocialMediaType.length === 0)
      throw new NotFoundException("SocialMediaType not found");

    return allSocialMediaType;
  }

  async findOne(id: number) {
    const social_media_type = await this.social_media_typeModel.findByPk(id, {
      include: { all: true },
    });
    if (!social_media_type)
      throw new NotFoundException("SocialMediaType not found");

    return social_media_type;
  }

  async update(id: number, updateSocialMediaTypeDto: UpdateSocialMediaTypeDto) {
    const social_media_type = await this.findOne(id);

    await social_media_type.update(updateSocialMediaTypeDto);

    return {
      message: "SocialMediaType successfully updated",
      social_media_type,
    };
  }

  async remove(id: number) {
    const social_media_type = await this.findOne(id);

    await social_media_type.destroy();

    return { message: "SocialMediaType successfully deleted", id };
  }
}
