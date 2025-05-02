import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { District } from "./models/district.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtModel: typeof District
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const newDistrict = await this.districtModel.create(createDistrictDto);

    return newDistrict;
  }
  async findAll() {
    const allDistrict = await this.districtModel.findAll({
      include: { all: true },
    });

    if (allDistrict.length === 0)
      throw new NotFoundException("District not found");
  }
  async findOne(id: number) {
    const district = await this.districtModel.findByPk(id, {
      include: { all: true },
    });
    if (!district) throw new NotFoundException("District not found");

    return district;
  }
  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.findOne(id);

    await district.update(updateDistrictDto);

    return { message: "District successfully updated", district };
  }
  async remove(id: number) {
    const district = await this.findOne(id);

    await district.destroy();

    return { message: "District successfully deleted", id };
  }
}
