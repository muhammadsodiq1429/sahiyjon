import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./admins/models/admin.model";
import { BotModule } from "./bot/bot.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.const";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { StatusModule } from "./status/status.module";
import { StoreModule } from "./store/store.module";
import { Region } from "./region/models/region.model";
import { District } from "./district/models/district.model";
import { Status } from "./status/models/status.model";
import { Store } from "./store/models/store.model";
import { SocialMediaTypeModule } from "./social_media_type/social_media_type.module";
import { StoreSocialLinksModule } from "./store_social_links/store_social_links.module";
import { TypeModule } from "./type/type.module";
import { CategoryModule } from "./category/category.module";
import { DiscountModule } from "./discount/discount.module";
import { SocialMediaType } from "./social_media_type/models/social_media_type.model";
import { StoreSocialLink } from "./store_social_links/models/store_social_link.model";
import { Type } from "./type/models/type.model";
import { Category } from "./category/models/category.model";
import { Discount } from "./discount/models/discount.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Admin, Region, District, Status, Store],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    MailModule,
    AdminsModule,
    BotModule,
    RegionModule,
    DistrictModule,
    StatusModule,
    StoreModule,
    SocialMediaTypeModule,
    StoreSocialLinksModule,
    TypeModule,
    CategoryModule,
    DiscountModule,
    SocialMediaType,
    StoreSocialLink,
    Type,
    Category,
    Discount,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
