import { config as _config } from "dotenv";

_config();
const config = {
  PORT: process.env.PORT || 3000,
  DBURL: process.env.DBURL,
  REDISURL: process.env.REDISURL,
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  IMAGE_SECRET_KEY: process.env.IMAGE_API_KEY || "",
  IMAGE_ACCES_KEY: process.env.IMAGE_API_KEY || "",
};
export default config;
