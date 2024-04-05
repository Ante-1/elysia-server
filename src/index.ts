import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(staticPlugin()).get("/", Bun.file("src/index.html")).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
