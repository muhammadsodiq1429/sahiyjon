import { Module } from "@nestjs/common";
import { MediaService } from "./media.service";
import { MediaController } from "./media.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Media } from "./models/media.model";

@Module({
  imports: [SequelizeModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
