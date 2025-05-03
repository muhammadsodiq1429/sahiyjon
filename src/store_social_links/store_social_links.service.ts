import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreSocialLinkDto } from "./dto/create-store_social_link.dto";
import { UpdateStoreSocialLinkDto } from "./dto/update-store_social_link.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StoreSocialLink } from "./models/store_social_link.model";

@Injectable()
export class StoreSocialLinksService {
  constructor(
    @InjectModel(StoreSocialLink)
    private readonly store_social_linkModel: typeof StoreSocialLink
  ) {}
  async create(createStoreSocialLinkDto: CreateStoreSocialLinkDto) {
    const newStoreSocialLink = await this.store_social_linkModel.create(
      createStoreSocialLinkDto
    );

    return newStoreSocialLink;
  }

  async findAll() {
    const allStoreSocialLink = await this.store_social_linkModel.findAll({
      include: { all: true },
    });

    if (allStoreSocialLink.length === 0)
      throw new NotFoundException("StoreSocialLink not found");

    return allStoreSocialLink;
  }

  async findOne(id: number) {
    const store_social_link = await this.store_social_linkModel.findByPk(id, {
      include: { all: true },
    });
    if (!store_social_link)
      throw new NotFoundException("StoreSocialLink not found");

    return store_social_link;
  }

  async update(id: number, updateStoreSocialLinkDto: UpdateStoreSocialLinkDto) {
    const store_social_link = await this.findOne(id);

    await store_social_link.update(updateStoreSocialLinkDto);

    return {
      message: "StoreSocialLink successfully updated",
      store_social_link,
    };
  }

  async remove(id: number) {
    const store_social_link = await this.findOne(id);

    await store_social_link.destroy();

    return { message: "StoreSocialLink successfully deleted", id };
  }
}
