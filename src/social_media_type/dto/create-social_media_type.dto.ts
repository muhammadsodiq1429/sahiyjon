import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateSocialMediaTypeDto {
  @IsNotEmpty()
  @IsString()
  based_url: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
