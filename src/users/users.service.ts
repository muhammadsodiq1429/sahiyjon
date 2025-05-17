import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import * as otpGenerator from "otp-generator";
import { MailService } from "../mail/mail.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PhoneUserDto } from "./dto/phone-user.dto";
import { BotService } from "../bot/bot.service";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { decode, encode } from "../common/helpers/crypto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { SmsService } from "../sms/sms.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
    private readonly botService: BotService
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
    if (!link) throw new BadRequestException("Activate link not found");
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

  async newOtp(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone_number;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //______________________BOT__________________________
    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Avval botdan ro'yxatdan o'ting");
    }
    // return { message: "OTP botga yuborildi" };

    //______________________SMS__________________________
    const response = await this.smsService.sendSms(phone_number, otp);

    //______________________EMAIL________________________

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };

    const endodedData = await encode(JSON.stringify(details));
    return {
      message: "OTP botga yuborildi",
      verification_key: endodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verifivation_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedDate = await decode(verifivation_key);
    const details = JSON.parse(decodedDate);
    if (details.phone_number != phone_number)
      throw new BadRequestException("OTP bu telefon raqamga yuborilmagan");

    const resultOtp = await this.otpModel.findByPk(details.otp_id);

    if (resultOtp == null) throw new BadRequestException("Bunday OTP yo'q");
    if (resultOtp.verified)
      throw new BadRequestException("OTP avval tekshirilgan");
    if (resultOtp.expiration_time < currentDate)
      throw new BadRequestException("Bu OTP'ning vaqti tugagan");
    if (resultOtp.otp != otp) throw new BadRequestException("OTP mos emas");

    const user = await this.userModel.update(
      { is_owner: true },
      { where: { phone: phone_number }, returning: true }
    );

    if (!user[1][0])
      throw new BadRequestException("Bunday raqamli foydalanuvchi yo'q");

    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } }
    );
    return { message: "🎉 Tabriklayman, siz owner bo'ldingiz" };
  }
}
