const MAX_TIME_IN_QUEUE = 20000;
const POOL_POLL_INTERVAL = 1000;
import fastify from "../../app.js";
import Matchmaking from "../../db/model/matchmaking.js";

const { redis } = fastify;
const matchmakingController = {
  /**
   * @type {Map<string,MatchingPlayer}
   */
  mm_pool: new Map(),

  /**
   *
   * @param {SocketStream} connection
   * @param {FastifyRequest} req
   */
  findOpponent: async (
    connection /* SocketStream */,
    req /* FastifyRequest */
  ) => {
    // Client connect
    connection.socket.on("connection", () => {
      console.log("you joined");
    });

    // Client message
    connection.socket.on("message", async (message) => {
      const msg = JSON.parse(message.toString());
      console.log(`Client message: ${msg.id}`);

      await Matchmaking.addPlayer(msg.id, msg.qP);

      Matchmaking.find_matches();
      // add player to pool if they are not already in pool
    });

    // CHECK POOL FOR MATCHES EVERY POOL_POLL_INTERVAL / 1000 SECONDS
    /*  setInterval(() => match_make(mm_pool), POOL_POLL_INTERVAL); */

    // Client disconnect
    connection.socket.on("close", () => {
      console.log("Client disconnected");
    });
  },
};
export default matchmakingController;
