import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class VerifyOtpDto {
  // @IsPhoneNumber("UZ")
  phone: string;

  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  verifivation_key: string;
}
