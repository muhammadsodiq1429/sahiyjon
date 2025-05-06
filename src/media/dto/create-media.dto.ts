import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  file: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  table_name: string;

  @IsNotEmpty()
  @IsNumber()
  table_id: number;
}
