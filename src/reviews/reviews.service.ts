import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "./models/review.model";

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}
  async create(createReviewDto: CreateReviewDto) {
    const newReview = await this.reviewModel.create(createReviewDto);

    return { message: "Review successfully reviewded", newReview };
  }

  async findAll() {
    const allReview = await this.reviewModel.findAll({
      include: { all: true },
    });

    if (allReview.length === 0)
      throw new NotFoundException("Reviews not found");

    return allReview;
  }

  async findOne(id: number) {
    const review = await this.reviewModel.findByPk(id);

    if (!review) throw new NotFoundException("Reviews not found");

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);
    await review.update(updateReviewDto);

    return { message: "Review successfully updated", updatedReview: review };
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    await review.destroy();

    return { message: "Review successfully deleted", id };
  }
}
