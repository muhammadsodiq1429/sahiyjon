import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "../category/models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryModel.create(createCategoryDto);

    return newCategory;
  }
  async findAll() {
    const allCategory = await this.categoryModel.findAll({
      include: { all: true },
    });

    if (allCategory.length === 0)
      throw new NotFoundException("Category not found");

    return allCategory;
  }
  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) throw new NotFoundException("Category not found");

    return category;
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    await category.update(updateCategoryDto);

    return { message: "Category successfully updated", category };
  }
  async remove(id: number) {
    const category = await this.findOne(id);

    await category.destroy();

    return { message: "Category successfully deleted", id };
  }
}
