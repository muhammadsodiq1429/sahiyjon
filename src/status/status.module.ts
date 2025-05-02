import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Status } from "./models/status.model";

@Module({
  imports: [SequelizeModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
