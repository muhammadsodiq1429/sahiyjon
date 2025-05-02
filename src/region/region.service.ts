import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.model";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}
  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionModel.create({
      ...createRegionDto,
      name: createRegionDto.name.toLocaleLowerCase(),
    });

    return newRegion;
  }

  async findAll() {
    const allRegion = await this.regionModel.findAll({
      include: { all: true },
    });

    if (allRegion.length === 0) throw new NotFoundException("Region not found");

    return allRegion;
  }

  async findOne(id: number) {
    const region = await this.regionModel.findByPk(id, {
      include: { all: true },
    });
    if (!region) throw new NotFoundException("Region not found");

    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.findOne(id);

    await region.update(updateRegionDto);

    return { message: "Region successfully updated", region };
  }

  async remove(id: number) {
    const region = await this.findOne(id);

    await region.destroy();

    return { message: "Region successfully deleted", id };
  }
}
