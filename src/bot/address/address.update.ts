import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "../bot.service";
import { AddressService } from "./address.service";

@Update()
export class AddressUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly addressService: AddressService
  ) {}
  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    return this.addressService.onAddress(ctx);
  }

  @Hears("Yangi manzil qo'shish")
  async onNewAddress(@Ctx() ctx: Context) {
    return this.addressService.onNewAddress(ctx);
  }
}
