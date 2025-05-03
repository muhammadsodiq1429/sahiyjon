import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
