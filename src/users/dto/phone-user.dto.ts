import { IsNotEmpty, IsString } from "class-validator";

export class PhoneUserDto {
  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
