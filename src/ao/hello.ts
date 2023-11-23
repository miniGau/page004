import Koa from "koa";
import { CosmosClient, User } from "@azure/cosmos";
import { IUser } from "./user.entity";

export async function hello(
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultState>
) {
  const users = await queryUser();
  ctx.success({
    hi: `test success`,
    users,
  });
}

async function queryUser() {
  const endpoint = `https://${process.env.azure_uri}:443/`;
  console.log("endpoint:", endpoint);
  const key = process.env.azure_db_key;
  const client = new CosmosClient({
    endpoint,
    key: key,
  });

  const query2 = "select * from c";
  const dbId = process.env.azure_db_name;
  const containerId = "tb_user2";
  const { resources } = await client
    .database(dbId)
    .container(containerId)
    .items?.query(query2)
    .fetchAll();

  console.log("resource:", resources);
  const users = resources.map((value) => {
    return {
      id: value.id,
      name: value.username || "",
    };
  });
  console.log(users);
}
