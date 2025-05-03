import { Module } from "@nestjs/common";
import { SocialMediaTypeService } from "./social_media_type.service";
import { SocialMediaTypeController } from "./social_media_type.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocialMediaType } from "./models/social_media_type.model";

@Module({
  imports: [SequelizeModule.forFeature([SocialMediaType])],
  controllers: [SocialMediaTypeController],
  providers: [SocialMediaTypeService],
})
export class SocialMediaTypeModule {}
