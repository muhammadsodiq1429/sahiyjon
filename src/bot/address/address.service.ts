import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InjectBot } from "nestjs-telegraf";
import { Context, Markup, Telegraf } from "telegraf";
import { Bot } from "../model/bot.model";
import { BOT_NAME } from "../../app.const";
import { Address } from "../model/address.model";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectModel(Address) private readonly addressModel: typeof Address,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async onAddress(ctx: Context) {
    try {
      // const user_id = ctx.from?.id;
      // const user = await this.botModel.findByPk(user_id);
      await ctx.replyWithHTML("Manzil bo‘yicha kerakli tugmani bosing", {
        ...Markup.keyboard([
          ["Mening manzillarim", "Yangi manzil qo‘shish"],
        ]).resize(true),
      });
    } catch (error) {
      console.log("Error on Address:", error);
    }
  }

  async onNewAddress(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await ctx.replyWithHTML(`Iltimos, <b>Start tugmasini bosing</b>`, {
          ...Markup.keyboard([["/start"]])
            .oneTime()
            .resize(true),
        });
      }
      await this.addressModel.create({
        user_id: user_id!,
        last_state: "name",
      });
      await ctx.replyWithHTML("Yangi manzil nomini kiriting", {
        ...Markup.removeKeyboard(),
      });
    } catch (error) {
      console.log("Error on Address:", error);
    }
  }

  async onMyAddresses(ctx: Context) {
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
        const addresses = await this.addressModel.findAll({
          where: { user_id, last_state: "finish" },
        });
        if (addresses.length === 0) {
          await ctx.replyWithHTML("Manzil topilmadi", {
            ...Markup.keyboard([
              ["Mening manzillarim", "Yangi manzil qo‘shish"],
            ]),
          });
        } else {
          addresses.forEach(async (address) => {
            await ctx.replyWithHTML(
              `<b>Manzil nomi:</b> ${address.name}\n<b>Manzil</b>: ${address.address}`,
              {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: "Joylashuvni ko‘rish",
                        callback_data: `loc_${address.id}`,
                      },
                      {
                        text: "Manzilni o‘chirish",
                        callback_data: `del_${address.id}`,
                      },
                    ],
                  ],
                },
              }
            );
          });
        }
      }
    } catch (error) {
      console.log("Error on MyAddresses:", error);
    }
  }

  async onClickLocation(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];
      const contextMessage = ctx.callbackQuery!["message"];
      const addressId = contextAction.split("_")[1];
      const address = await this.addressModel.findByPk(addressId);
      await ctx.deleteMessage(contextMessage?.message_id);
      await ctx.replyWithLocation(
        Number(address?.location.split(",")[0]),
        Number(address?.location.split(",")[1])
      );
    } catch (error) {
      console.log("Error on Click Location:", error);
    }
  }

  async onClickDelete(ctx: Context) {
    try {
      const contextAction = ctx.callbackQuery!["data"];

      const addressId = contextAction.split("_")[1];
      await this.addressModel.destroy({ where: { id: addressId } });

      await ctx.editMessageText("Manzil o‘chirildi");
    } catch (error) {
      console.log("Error on Click Delete:", error);
    }
  }
}
