import { Module } from "@nestjs/common";
import { DiscountService } from "./discount.service";
import { DiscountController } from "./discount.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Discount } from "./models/discount.model";

@Module({
  imports: [SequelizeModule.forFeature([Discount])],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
