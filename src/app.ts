import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import router from "./router";
import { catchError } from "./middleware/catchError";
import { customResponse } from "./middleware/customResponse";
import cors from "koa2-cors";

const app = new Koa();
dotenv.config();
app.use(cors());
app.use(catchError());
app.use(customResponse());
app.use(bodyParser({ jsonLimit: "5mb" }));
app.use(router.routes());
app.use(router.allowedMethods());

app.on("error", console.error);

export default app;
