import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AdminsService } from "../admins/admins.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(user) {
    const payload = {
      id: user.id,
      is_owner: user?.is_owner,
      is_active: user.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signUpUser(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) throw new ConflictException("Email already exists");
    const newUser = await this.usersService.create(createUserDto);

    return { message: "User signed up", userId: newUser.id };
  }

  async signInUser(signInUserDto: SignInUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signInUserDto.email);
    if (!user) throw new BadRequestException("Email or password incorrect");
    if (!user.is_active) throw new BadRequestException("User is not active");
    const isValidPasswrod = await bcrypt.compare(
      signInUserDto.password,
      user.hashed_password
    );

    if (!isValidPasswrod)
      throw new BadRequestException("Email or password incorrect");

    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_TIME),
    });
    await user.update({
      hashed_refresh_token: await bcrypt.hash(refreshToken, 7),
    });

    return {
      message: "Welcome to the system",
      accessToken,
    };
  }

  async signOutUser(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) throw new ForbiddenException("User not found");

    await this.usersService.updateRefreshToken(userData.id, "");

    res.clearCookie("refresh_token");

    return { message: "User signed out successfully", test: "test" };
  }

  async refreshUser(id: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);

    if (id !== decodeToken["id"])
      throw new ForbiddenException("Ruxsat etilmagan");

    const user = await this.usersService.findOne(id);

    console.log(user.hashed_refresh_token);
    if (!user.hashed_refresh_token)
      throw new NotFoundException("User not found");

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );

    if (!tokenMatch) throw new ForbiddenException("Forbidden");

    const { accessToken, refreshToken } = await this.generateTokens(user);

    await user.update({
      hashed_refresh_token: await bcrypt.hash(refreshToken, 7),
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_TIME),
      httpOnly: true,
    });

    return {
      message: "User tokens refreshed",
      userId: user.id,
      accessToken,
    };
  }
}
