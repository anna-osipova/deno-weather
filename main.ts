import { Application } from "https://deno.land/x/oak/mod.ts";
import * as flags from "https://deno.land/std@v0.50.0/flags/mod.ts";
import { getWeather, MappedEntry } from "./weather.ts";

const DEFAULT_PORT = 8081;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();

console.log(`Starting server on port ${port}`);
app.use(async (ctx) => {
  const weather = await getWeather();
  ctx.response.headers.set("Content-type", "application/json");
  ctx.response.body = JSON.stringify(weather);
});
await app.listen({ port });
