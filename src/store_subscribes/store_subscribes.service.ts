import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreSubscribeDto } from "./dto/create-store_subscribe.dto";
import { UpdateStoreSubscribeDto } from "./dto/update-store_subscribe.dto";
import { InjectModel } from "@nestjs/sequelize";
import { StoreSubscribe } from "./models/store_subscribe.model";

@Injectable()
export class StoreSubscribesService {
  constructor(
    @InjectModel(StoreSubscribe)
    private readonly storeSubscribeModel: typeof StoreSubscribe
  ) {}
  async create(createStoreSubscribeDto: CreateStoreSubscribeDto) {
    const newStoreSubscribe = await this.storeSubscribeModel.create(
      createStoreSubscribeDto
    );

    return {
      message: "StoreSubscribe successfully created",
      newStoreSubscribe,
    };
  }

  async findAll() {
    const allStoreSubscribe = await this.storeSubscribeModel.findAll({
      include: { all: true },
    });

    if (allStoreSubscribe.length === 0)
      throw new NotFoundException("StoreSubscribe not found");

    return allStoreSubscribe;
  }

  async findOne(id: number) {
    const storeSubscribe = await this.storeSubscribeModel.findByPk(id);
    if (!storeSubscribe)
      throw new NotFoundException("StoreSubscribe not found");

    return storeSubscribe;
  }

  async update(id: number, updateStoreSubscribeDto: UpdateStoreSubscribeDto) {
    const storeSubscribe = await this.findOne(id);
    await storeSubscribe.update(updateStoreSubscribeDto);

    return { message: "StoreSubscribe successfully updated", storeSubscribe };
  }

  async remove(id: number) {
    const storeSubscribe = await this.findOne(id);
    await storeSubscribe.destroy();

    return { message: "StoreSubscribe successfully deleted", id };
  }
}
