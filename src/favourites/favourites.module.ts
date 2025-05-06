import { Module } from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { FavouritesController } from "./favourites.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Favourite } from "./models/favourite.model";

@Module({
  imports: [SequelizeModule.forFeature([Favourite])],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
