const MAX_TIME_IN_QUEUE = 20000;
const POOL_POLL_INTERVAL = 1000;
import fastify from "../../app.js";

const { redis } = fastify;
const matchmaking = {
  /**
   * @type {Map<string,MatchingPlayer}
   */
  mm_pool: new Map(),

  /**
   *
   * @param {SocketStream} connection
   * @param {FastifyRequest} req
   */
  findOpponent: (connection /* SocketStream */, req /* FastifyRequest */) => {
    // Client connect
    connection.socket.on("connection", () => {
      console.log("you joined");
    });

    // Client message
    connection.socket.on("message", (message) => {
      const msg = JSON.parse(message.toString());
      console.log(`Client message: ${message}`);
      const p = {
        // parse message from client as UnmatchedPlayer :: NO TYPE CHECKING HAS BEEN IMPLEMENTED.
        id: msg.id,
        time_joined: Date.now(),
        qP: msg.qP,
        category: msg.category,
      };
      // add player to pool if they are not already in pool
      if (!this.mm_pool.has(p.id)) {
        this.mm_pool.set(p.id, { socket: ws, player: p });
        console.log("Added player to pool");
        console.log(this.mm_pool);
      } else {
        connection.socket.close();
      }
    });

    // CHECK POOL FOR MATCHES EVERY POOL_POLL_INTERVAL / 1000 SECONDS
    /*  setInterval(() => match_make(mm_pool), POOL_POLL_INTERVAL); */

    // Client disconnect
    connection.socket.on("close", () => {
      console.log("Client disconnected");
    });
  },
};
export default matchmaking;
