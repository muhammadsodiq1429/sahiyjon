import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Discount } from "../discount/models/discount.model";

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private readonly discountModel: typeof Discount
  ) {}
  async create(createDiscountDto: CreateDiscountDto) {
    const newDiscount = await this.discountModel.create(createDiscountDto);

    return newDiscount;
  }
  async findAll() {
    const allDiscount = await this.discountModel.findAll({
      include: { all: true },
    });

    if (allDiscount.length === 0)
      throw new NotFoundException("Discount not found");

    return allDiscount;
  }
  async findOne(id: number) {
    const discount = await this.discountModel.findByPk(id, {
      include: { all: true },
    });
    if (!discount) throw new NotFoundException("Discount not found");

    return discount;
  }
  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.findOne(id);

    await discount.update(updateDiscountDto);

    return { message: "Discount successfully updated", discount };
  }
  async remove(id: number) {
    const discount = await this.findOne(id);

    await discount.destroy();

    return { message: "Discount successfully deleted", id };
  }
}
