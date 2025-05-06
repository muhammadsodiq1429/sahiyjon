import { Module } from "@nestjs/common";
import { StoreSubscribesService } from "./store_subscribes.service";
import { StoreSubscribesController } from "./store_subscribes.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { StoreSubscribe } from "./models/store_subscribe.model";

@Module({
imports: [SequelizeModule.forFeature([StoreSubscribe])],
  controllers: [StoreSubscribesController],
  providers: [StoreSubscribesService],
})
export class StoreSubscribesModule {}
