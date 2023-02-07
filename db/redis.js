import Redis from "ioredis";

const redis = new Redis(
  "redis://default:51da3378c957475885cfc7eb016ab6ab@eu2-hopeful-thrush-31554.upstash.io:31554"
);

export default redis;
