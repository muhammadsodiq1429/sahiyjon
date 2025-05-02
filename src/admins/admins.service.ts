import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    if (await this.findByAdminEmail(createAdminDto.email))
      throw new ConflictException("Email already exists");
    const newAdmin: Admin = await this.adminModel.create({
      ...createAdminDto,
      hashed_passwrod: await bcrypt.hash(createAdminDto.passwrod, 7),
    });

    return { message: "Admin successfully created", newAdminId: newAdmin.id };
  }

  async findAll() {
    const allAdmin: Admin[] = await this.adminModel.findAll();
    if (allAdmin.length === 0) throw new NotFoundException("Admin not found");

    return allAdmin;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException("Admin not found");

    return admin;
  }

  async findByAdminEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    await admin.update(updateAdminDto);

    return { message: "Admin successfully updated", updatedAdminId: id };
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await this.adminModel.destroy();

    return { message: "Admin successfully deleted", updatedAdminId: id };
  }
}
