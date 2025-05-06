import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  discount_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  rating: "1" | "2" | "3" | "4" | "5";
}
