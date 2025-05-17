import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./model/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.const";
import { Context, Markup, Telegraf } from "telegraf";
import { Address } from "./model/address.model";
import { Op } from "sequelize";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          lang: ctx.from?.language_code!,
        });

        await ctx.replyWithHTML(
          `Iltimos, <b>Telefon raqamni yuborish tugmasini bosing</b>`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else if (!user.status || !user.phone_number) {
        await ctx.replyWithHTML(
          `Iltimos, <b>Telefon raqamni yuborish tugmasini bosing</b>`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          "Bu bot orqali sahiyjon dasturida sotuvchilar faollashtiriladi",
          { ...Markup.removeKeyboard() }
        );
      }
    } catch (error) {
      console.log("Error on Start:", error);
    }
  }

  async onContact(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(true),
        });
      } else if (user.phone_number) {
        await this.bot.telegram.sendChatAction(user_id!, "record_video");
        await ctx.replyWithHTML("Siz avval ro‘yxatdan o'tgansiz");
      } else if (
        "contact" in ctx.message! &&
        ctx.message.contact.user_id != user_id
      ) {
        await ctx.replyWithHTML(
          `Iltimos, o‘zingizni telefon raqamingizni yuboring`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(true),
          }
        );
      } else if ("contact" in ctx.message!) {
        let phone = ctx.message.contact.phone_number;
        if (phone[0]! + "+") {
          phone = "+" + phone;
        }
        user.phone_number = phone;
        user.status = true;
        await user.save();
        await ctx.replyWithHTML(`Tabriklayman ro‘yxatdan o'tdingiz`, {
          ...Markup.removeKeyboard(),
        });
      }
    } catch (error) {
      console.log("Error on Contact:", error);
    }
  }

  async onStop(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);
      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(true),
        });
      } else if (user.status) {
        user.status = false;
        user.phone_number = "";
        await user.save();
        await ctx.replyWithHTML(
          `Siz vaqtincha botdan chiqdingiz. Qayta faollashtirish uchun <b>Start</b> tugmasini bosing`,
          {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(true),
          }
        );
      }
    } catch (error) {
      console.log("Error on Stop:", error);
    }
  }

  async sendOtp(phone_number: string, Otp: string) {
    try {
      const user = await this.botModel.findOne({ where: { phone_number } });
      if (!user || !user.status) {
        return false;
      }
      await this.bot.telegram.sendMessage(user.user_id, `Verify code ${Otp}`);
      return true;
    } catch (error) {
      console.log("Error on SendOtp:", error);
    }
  }

  async onText(ctx: Context) {
    if (ctx.message && "text" in ctx.message) {
      try {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(true),
          });
        } else {
          const address = await this.addressModel.findOne({
            where: {
              user_id,
              last_state: { [Op.ne]: "finish" },
            },
            order: [["id", "DESC"]],
          });
          if (address) {
            const userInput = ctx.message.text;
            switch (address.last_state) {
              case "name":
                address.name = userInput;
                address.last_state = "address";
                await address.save();
                await ctx.reply("Mazilingizni kiriting:", {
                  parse_mode: "HTML",
                  ...Markup.removeKeyboard(),
                });
                break;
              case "address":
                address.address = userInput;
                address.last_state = "location";
                await address.save();
                await ctx.reply("Mazilingiz joylashivini yuboring", {
                  parse_mode: "HTML",
                  ...Markup.keyboard([
                    [Markup.button.locationRequest("📍Joylashuvniyuboring")],
                  ]).resize(true),
                });
                break;
            }
          }
        }
        // await ctx.replyWithHTML(`Shu yerga keldik`);
      } catch (error) {
        console.log("Error on Text:", error);
      }
    } else {
      console.log("else");
    }
  }

  async onLocation(ctx: Context) {
    try {
      if (ctx.message && "location" in ctx.message) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);

        if (!user) {
          await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
            ...Markup.keyboard([["/start"]])
              .oneTime()
              .resize(true),
          });
        } else {
          const address = await this.addressModel.findOne({
            where: {
              user_id,
              last_state: { [Op.ne]: "finish" },
            },
            order: [["id", "DESC"]],
          });
          if (address && address.last_state == "location") {
            address.location = `${ctx.message.location.latitude},${ctx.message.location.longitude}`;
            address.last_state = "finish";
            await address.save();
            await ctx.reply("Manzil saqlandi", {
              parse_mode: "HTML",
              ...Markup.keyboard([
                ["Mening manzillarim", "Yangi manzil qo‘shish"],
              ]).resize(true),
            });
          }
        }
      }
    } catch (error) {
      console.log("Error on Location:", error);
    }
  }

  async admin_menu(ctx: Context, menu_text: string = `<b>Admin menyusi</b>`) {
    try {
      await ctx.reply(menu_text, {
        parse_mode: "HTML",
        ...Markup.keyboard([["ADMIN", "NIMDA"]])
          .oneTime()
          .resize(),
      });
    } catch (error) {
      console.log("on admin menu", error);
    }
  }
}
