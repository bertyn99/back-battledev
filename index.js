// Dev comments :

import express, { urlencoded, json } from "express";
const app = express();
import compression from "compression";
import morgan from "morgan";
import config from "./config.js";
import { router as apiRouter } from "./route.js";
import rateLimit from "express-rate-limit";
import rfs from "rotating-file-stream";

const apiLimiter = rateLimit({
  windowMs: /* */ 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "You have exceeded the 50 requests in 15 min limit!",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());

// create a log stream
const rfsStream = rfs.createStream("log/log.txt", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "10d", // rotate daily
  compress: "gzip", // compress rotated files
});
app.use(
  morgan("dev", {
    stream: rfsStream,
  })
);
app.use(morgan("tiny"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(apiLimiter);
// Apply the rate limiting middleware to API calls only
app.use("/api", apiRouter);

app.listen(config.PORT, () => {
  console.log(`Application listening on port ${config.PORT}!`);
});
