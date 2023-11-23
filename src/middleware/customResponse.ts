// 统一返回数据格式
import Koa from "koa";

export function customResponse() {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.success = (data: Record<string, any> | Record<string, any>[]) => {
      ctx.body = {
        data,
        code: 0,
        message: "",
      };
    };
    ctx.fail = (code: number, message: string) => {
      ctx.body = {
        code,
        message,
        data: null,
      };
    };
    await next();
  };
}
