import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { Admin } from "../admins/models/admin.model";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up-user")
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @Post("sign-in-user")
  async signInUser(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInUser(signInUserDto, res);
  }

  @Post("sign-in-admin")
  async signInAdmin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInUser(signInUserDto, res);
  }

  @Post("sign-out-user")
  async signOutUser(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutUser(refreshToken, res);
  }

  @Get(":id/refresh-user")
  refreshUser(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshUser(id, refresh_token, res);
  }
}
