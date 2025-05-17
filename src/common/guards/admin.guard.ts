import { CanActivate, ExecutionContext } from "@nestjs/common";
import { TelegrafException, TelegrafExecutionContext } from "nestjs-telegraf";
import { Observable } from "rxjs";
import { Context } from "telegraf";

export class AdminGuard implements CanActivate {
  private readonly ADMIN = process.env.ADMINƒ;
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    if (from && Number(this.ADMIN) != from.id)
      throw new TelegrafException("Siz admin emassiz. Ruxsat yo'q");
    return true;
  }
}
