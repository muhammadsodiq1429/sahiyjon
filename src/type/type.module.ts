import { Module } from "@nestjs/common";
import { TypeService } from "./type.service";
import { TypeController } from "./type.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Type } from "./models/type.model";

@Module({
  imports: [SequelizeModule.forFeature([Type])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
