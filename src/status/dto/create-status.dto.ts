import { IsNotEmpty, IsString } from "class-validator";

export class CreateStatusDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  description: string;
}
