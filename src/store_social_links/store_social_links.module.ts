import { Module } from "@nestjs/common";
import { StoreSocialLinksService } from "./store_social_links.service";
import { StoreSocialLinksController } from "./store_social_links.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { StoreSocialLink } from "./models/store_social_link.model";

@Module({
  imports: [SequelizeModule.forFeature([StoreSocialLink])],
  controllers: [StoreSocialLinksController],
  providers: [StoreSocialLinksService],
})
export class StoreSocialLinksModule {}
