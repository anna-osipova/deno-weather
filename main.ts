import { Application } from "https://deno.land/x/oak/mod.ts";
import * as flags from "https://deno.land/std@v0.50.0/flags/mod.ts";

const DEFAULT_PORT = 8081;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();

console.log(`Starting server on port ${port}`);
app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port });