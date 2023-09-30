import next from "next";
import { createServer } from "http";
import { parse } from "url";
import { database } from "./libs/database";

process.env.TZ = "Europe/Istanbul";
const app = next({
  hostname: "localhost",
  //@ts-ignore
  port: parseInt(process.env.SERVER_PORT, 10),
  dev: process.env.NODE_ENV !== "production",
});
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    // check db connection
    return database.authenticate();
  })
  .then(() => {
    createServer((req, res) => {
      handler(req, res, parse(req.url!, true));
    }).listen({
      host: process.env.SERVER_HOST,
      port: process.env.SERVER_PORT,
    });

    // tslint:disable-next-line:no-console

    console.info(
      `> Server listening at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
    );
  })
  .catch(async (err) => {
    /* logger.error("App not started", err); */
    console.error("App not started", err);
    await database.close();
    /* await redis.quit(); */
    process.exit(0);
  });

process.on("SIGTERM", async () => {
  console.info("App Stopping... (Received SIGTERM)");
  await database.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.info("App Stopping... (Received SIGINT)");
  await database.close();
  process.exit(0);
});
