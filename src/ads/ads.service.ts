import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Ad } from "./models/ad.model";

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad) private readonly adModel: typeof Ad) {}
  async create(createAdDto: CreateAdDto) {
    const newAd = await this.adModel.create(createAdDto);

    return { message: "Ad successfully added", newAd };
  }

  async findAll() {
    const allAd = await this.adModel.findAll({ include: { all: true } });

    if (allAd.length === 0) throw new NotFoundException("Ads not found");

    return allAd;
  }

  async findOne(id: number) {
    const ad = await this.adModel.findByPk(id);

    if (!ad) throw new NotFoundException("Ads not found");

    return ad;
  }

  async update(id: number, updateAdDto: UpdateAdDto) {
    const ad = await this.findOne(id);
    await ad.update(updateAdDto);

    return { message: "Ad successfully updated", updatedAd: ad };
  }

  async remove(id: number) {
    const ad = await this.findOne(id);
    await ad.destroy();

    return { message: "Ad successfully deleted", id };
  }
}
