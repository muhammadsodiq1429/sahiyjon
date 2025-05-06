import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Review } from "./models/review.model";

@Module({
  imports: [SequelizeModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
