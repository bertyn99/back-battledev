// Dev comments :
import Fastify from "fastify";
import fastifyWebSocket from "@fastify/websocket";
import compression from "compression";
import morgan from "morgan";
import apiRouter from "./route.js";
import rateLimit from "express-rate-limit";
import rfs from "rotating-file-stream";
import verifyToken from "./plugins/verifyToken.js";
import config from "./config.js";

const apiLimiter = rateLimit({
  windowMs: /* */ 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "You have exceeded the 50 requests in 15 min limit!",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
export const fastify = Fastify({
  logger: true,
});
export default async function buildApp() {
  // create a log stream
  /*   const rfsStream = rfs.createStream("log/log.txt", {
    size: "10M", // rotate every 10 MegaBytes written
    interval: "10d", // rotate daily
    compress: "gzip", // compress rotated files
  });
  app.use(
    morgan("dev", {
      stream: rfsStream,
    })
  ); 
  fastify.use(morgan("tiny"));
     app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  }); 
    fastify.use(apiLimiter); */
  // db redis

  fastify.register(verifyToken);
  fastify.register(fastifyWebSocket);
  fastify.register(apiRouter, { prefix: "/api" });
  return fastify;
}
