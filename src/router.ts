import Router from "koa-router";
import { hello } from "./ao/hello";
const router = new Router({
  prefix: "/api",
});

router.get("/", hello);

export default router;
