import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { UpdateFavouriteDto } from "./dto/update-favourite.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Favourite } from "../favourites/models/favourite.model";

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(Favourite) private favouriteModel: typeof Favourite
  ) {}
  async create(createFavouriteDto: CreateFavouriteDto) {
    const newFavourite = await this.favouriteModel.create(createFavouriteDto);

    return { message: "Favourite successfully favouriteded", newFavourite };
  }

  async findAll() {
    const allFavourite = await this.favouriteModel.findAll({
      include: { all: true },
    });

    if (allFavourite.length === 0)
      throw new NotFoundException("Favourites not found");

    return allFavourite;
  }

  async findOne(id: number) {
    const favourite = await this.favouriteModel.findByPk(id);

    if (!favourite) throw new NotFoundException("Favourites not found");

    return favourite;
  }

  async update(id: number, updateFavouriteDto: UpdateFavouriteDto) {
    const favourite = await this.findOne(id);
    await favourite.update(updateFavouriteDto);

    return {
      message: "Favourite successfully updated",
      updatedFavourite: favourite,
    };
  }

  async remove(id: number) {
    const favourite = await this.findOne(id);
    await favourite.destroy();

    return { message: "Favourite successfully deleted", id };
  }
}
