import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "../status/models/status.model";

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly statusModel: typeof Status
  ) {}
  async create(createStatusDto: CreateStatusDto) {
    const newStatus = await this.statusModel.create({
      ...createStatusDto,
      name: createStatusDto.name.toLocaleLowerCase(),
    });

    return newStatus;
  }

  async findAll() {
    const allStatus = await this.statusModel.findAll({
      include: { all: true },
    });

    if (allStatus.length === 0) throw new NotFoundException("Status not found");

    return allStatus;
  }

  async findOne(id: number) {
    const status = await this.statusModel.findByPk(id, {
      include: { all: true },
    });
    if (!status) throw new NotFoundException("Status not found");

    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const status = await this.findOne(id);

    await status.update(updateStatusDto);

    return { message: "Status successfully updated", status };
  }

  async remove(id: number) {
    const status = await this.findOne(id);

    await status.destroy();

    return { message: "Status successfully deleted", id };
  }
}
