import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password)
      throw new BadRequestException("Pasrollar mos emas");

    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(
        "Emailga xat yuborishda xatolik",
        error.message
      );
    }

    return newUser;
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findAll() {
    const allUser = await this.userModel.findAll();
    if (allUser.length === 0) throw new NotFoundException("User not found");

    return allUser;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    console.log(user);
    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await user.update(updateUserDto);

    return { message: "User successfully update" };
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: "User successfully deleted", id };
  }

  async activateUser(link: string) {
    if (!link) throw new BadRequestException("Activate lik not found");
    const updatedUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!updatedUser[1][0])
      throw new BadRequestException("User already activated");

    return {
      message: "User successfully activated",
      is_active: updatedUser[1][0].is_active,
    };
  }
}
