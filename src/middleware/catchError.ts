import Koa from "koa";

export function catchError() {
  return async function (ctx: Koa.Context, next: Koa.Next): Promise<any> {
    try {
      await next();
    } catch (error) {
      console.error(error);
      console.info(
        `${ctx.method} ${ctx.url} ${JSON.stringify(ctx?.state?.user)}`
      );
      console.info(`request--->: ${JSON.stringify(ctx.request.body)}`);
      console.info(`response--->: ${JSON.stringify(ctx.response.body)}`);
      ctx.fail(error?.code || 500, error.message);
    }
  };
}

export class CustomError extends Error {
  public code = 0;

  public constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
  }

  public getCodeMsg() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
