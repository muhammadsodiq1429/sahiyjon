import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateStoreSubscribeDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  store_id: number;
}
