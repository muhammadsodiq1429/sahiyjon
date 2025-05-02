import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwrod: string;

  @IsBoolean()
  is_creator: boolean;

  @IsBoolean()
  is_active: boolean;
}
