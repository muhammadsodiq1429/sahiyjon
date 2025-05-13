import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { SequelizeModule } from "@nestjs/sequelize";
import { Bot } from "./model/bot.model";
import { AddressUpdate } from "./address/address.update";
import { Address } from "./model/address.model";
import { AddressService } from "./address/address.service";
import { CarService } from "./car/car.service";
import { Car } from "./model/car.model";

@Module({
  imports: [SequelizeModule.forFeature([Bot, Address, Car])],
  controllers: [],
  providers: [
    BotService,
    AddressService,
    CarService,
    CarService,
    AddressUpdate,
    BotUpdate,
  ],
  exports: [BotService],
})
export class BotModule {}
