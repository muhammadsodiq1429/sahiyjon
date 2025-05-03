import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStoreSocialLinkDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  store_id: number;

  @IsNumber()
  @IsNotEmpty()
  social_media_type_id: number;
}
