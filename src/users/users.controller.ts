import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserGuard } from "../common/guards/user.guard";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(200)
  @Post("new-otp")
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @HttpCode(200)
  @Post("verify-otp")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.usersService.verifyOtp(verifyOtpDto);
  }
}
