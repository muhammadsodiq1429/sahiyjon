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

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    ctx.reply("Assalamu alaykum");
  }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if (ctx.message && "photo" in ctx.message) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if (ctx.message && "video" in ctx.message) {
  //     console.log(ctx.message.video);
  //     await ctx.replyWithVideo(String(ctx.message.video.file_id));
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if (ctx.message && "sticker" in ctx.message) {
  //     console.log(ctx.message.sticker);
  //     //   await ctx.replyWithSticker(String(ctx.message.sticker.file_size));
  //     await ctx.replyWithSticker(String(ctx.message.sticker.file_id));
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if (ctx.message && "animation" in ctx.message) {
  //     console.log(ctx.message.animation);
  //     await ctx.replyWithAnimation(String(ctx.message.animation.file_id));
  //   }
  // }

  // @On("document")
  // async onDocument(@Ctx() ctx: Context) {
  //   if (ctx.message && "document" in ctx.message) {
  //     console.log(ctx.message.document);
  //     await ctx.replyWithDocument(String(ctx.message.document.file_name));
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if (ctx.message && "contact" in ctx.message) {
  //     console.log(ctx.message.contact);
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //     await ctx.reply(String(ctx.message.contact.first_name));
  //   }
  // }

  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if (ctx.message && "location" in ctx.message) {
  //     console.log(ctx.message.location);
  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }

  // @On("voice")
  // async onVoice(@Ctx() ctx: Context) {
  //   if (ctx.message && "voice" in ctx.message) {
  //     console.log(ctx.message.voice);
  //     await ctx.replyWithVoice(ctx.message.voice.file_id);
  //   }
  // }

  // @Hears("hi")
  // async onHearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hey there");
  // }

  // @Command("help")
  // async onCommandHelp(@Ctx() ctx: Context) {
  //   await ctx.reply("yo'q");
  // }

  @Command("inline")
  async onCommandInline(@Ctx() ctx: Context) {
    const inlineKey = [
      [
        {
          text: "Button 1",
          callback_data: "button_1",
        },
        {
          text: "Button 2",
          callback_data: "button_2",
        },
        {
          text: "Button 3",
          callback_data: "button_3",
        },
      ],
      [
        {
          text: "Button 4",
          callback_data: "button_4",
        },
        {
          text: "Button 5",
          callback_data: "button_5",
        },
      ],
      [
        {
          text: "Button 6",
          callback_data: "button_6",
        },
      ],
    ];

    await ctx.reply("Kerakli tugmani tanlang:", {
      reply_markup: {
        inline_keyboard: inlineKey,
      },
    });
  }

  // @Action("button_1")
  // async onActionButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Button1 bosildi");
  // }

  // @Action(/^button_\d$/)
  // async onActionAnyButton(@Ctx() ctx: Context) {
  //   if ("data" in ctx.callbackQuery!) {
  //     const buttonData = ctx.callbackQuery?.data;
  //     const id = buttonData.split("_")[1];
  //     await ctx.reply(`${id}-Button bosildi`);
  //   }
  // }

  // @Command("main")
  // async onCommandMain(@Ctx() ctx: Context) {
  //   const mainKeyBoard = [
  //     ["bir", "ikki", "uch"],
  //     ["to‘rt", "besh"],
  //     ["olti"],
  //     [Markup.button.contactRequest("Telefon raqamni yuboring")],
  //   ];
  //   await ctx.reply("Kerakli Main Buttonni tanlang:", {
  //     ...Markup.keyboard(mainKeyBoard).resize(true),
  //   });
  // }

  // @Hears("bit")
  // async onHearsButtonBir(@Ctx() ctx: Context) {
  //   await ctx.reply("Main bir bosildi");
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   if (ctx.message) {
  //     if ("text" in ctx.message) {
  //       if (ctx.message.text.toLocaleLowerCase() == "assalamu alaykum") {
  //         await ctx.replyWithHTML("<b>Va assalamu alaykum</b>");
  //       } else {
  //         await ctx.replyWithHTML(ctx.message.text);
  //       }
  //     }
  //   }
  // }
  @On("message")
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat!.id!);
    console.log(ctx.from);
    console.log(ctx.from!.id!);
  }
}
