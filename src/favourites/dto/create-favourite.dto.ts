import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFavouriteDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  discount_id: number;
}
