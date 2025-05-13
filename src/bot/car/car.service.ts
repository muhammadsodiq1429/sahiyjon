import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Context, Markup, Telegraf } from "telegraf";
import { Car } from "../model/car.model";

@Injectable()
export class CarService {
  constructor(@InjectModel(Car) carModel: typeof Car) {}

  async onCar(ctx: Context) {
    try {
      await ctx.replyWithHTML("Mashina bo‘yicha kerakli tugmani tanlang:", {
        ...Markup.keyboard([
          ["Mening mashinalarim", "Yangi mashina qo'shish"],
        ]).resize(true),
      });
    } catch (error) {
      console.log("Error on Car:", error);
    }
  }
}
