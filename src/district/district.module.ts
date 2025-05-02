import { Module } from "@nestjs/common";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { District } from "./models/district.model";

@Module({
  imports: [SequelizeModule.forFeature([District])],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
