import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AdminsModule } from "../admins/admins.module";

@Module({
  imports: [JwtModule.register({ global: true }), UsersModule, AdminsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
