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
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    // console.log(ctx);
    // console.log(ctx.from);
    return this.botService.start(ctx);
  }

  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    return this.botService.onStop(ctx);
  }

  @On("location")
  async onLocation(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    // console.log("text");
    return this.botService.onText(ctx);
  }

  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log("message");
    // console.log(ctx.botInfo);
    // console.log(ctx.chat);
    // console.log(ctx.chat!.id!);
    // console.log(ctx.from);
    // console.log(ctx.from!.id!);
  }
}
