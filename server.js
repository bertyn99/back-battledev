import buildApp from "./app.js";
import config from "./config.js";
const server = buildApp();

server.listen(config.PORT, () => {
  console.log(`Application listening on port ${config.PORT}!`);
});
