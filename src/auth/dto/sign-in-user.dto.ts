import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInUserDto {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
