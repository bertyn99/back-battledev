import redis from "../redis.js";
const Matchmaking = {
  addPlayer: async (id, qP) => {
    try {
      if (!id || !qP) return;
      await redis.zadd("player-pool", qP, id);
      return;
    } catch (error) {
      console.log(error);
    }
  },
  getMatchMakingPool: async () => {
    return await redis.zrange("player-pool", 0, -1, "WITHSCORES");
  },
  getCurrentBattlePool: async () => {
    return await redis.zrange("current-battle", 0, -1, "WITHSCORES");
  },
  /**
   * add a new battle to the battle pool
   * @param {*} battle
   */
  addNewBattleInPool: async (battle) => {
    return await redis.zadd("current-battle", battle);
  },
  /**
   *  Loop over all players and look for potential opponents. Publish a match when 2 opponents have been found within eachothers ELO-range.
   * The longer a player is queueing the bigger his ELO-range will be. This should reduce matchmaking time and can be tuned with variables in the config.
   *It's important that a when a possible opponent is found that the player is also in the opponents player's ELO-range, this gives more balanced matches.
   * It's also possible to cap out the ELO-range as to not get extreme ELO differences between players.
   */
  find_matches: async () => {
    console.log("ici");
    const pool = redis.zscanStream("player-pool");
    pool.on("data", (resultKeys) => {
      // `resultKeys` is an array of strings representing key names.
      // Note that resultKeys may contain 0 keys, and that it will sometimes
      // contain duplicates due to SCAN's implementation in Redis.
      for (let i = 0; i < resultKeys.length; i++) {
        console.log(resultKeys[i]);
      }
    });
    pool.on("end", () => {
      console.log("all keys have been visited");
    });
  },
};

export default Matchmaking;
