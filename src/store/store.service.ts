import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Store } from "../store/models/store.model";

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store) private readonly storeModel: typeof Store) {}
  async create(createStoreDto: CreateStoreDto) {
    const newStore = await this.storeModel.create(createStoreDto);

    return newStore;
  }

  async findAll() {
    const allStore = await this.storeModel.findAll({
      include: { all: true },
    });

    if (allStore.length === 0) throw new NotFoundException("Store not found");

    return allStore;
  }

  async findOne(id: number) {
    const store = await this.storeModel.findByPk(id, {
      include: { all: true },
    });
    if (!store) throw new NotFoundException("Store not found");

    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store = await this.findOne(id);

    await store.update(updateStoreDto);

    return { message: "Store successfully updated", store };
  }

  async remove(id: number) {
    const store = await this.findOne(id);

    await store.destroy();

    return { message: "Store successfully deleted", id };
  }
}
