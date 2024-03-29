import buildApp from "./app.js";
import config from "./config.js";

const serverFastify = await buildApp();

try {
  serverFastify.listen({ port: config.PORT }, () => {
    console.log(`Application listening on port ${config.PORT}!`);
  });
} catch (error) {
  serverFastify.log.error(error);
  process.exit(1);
}
