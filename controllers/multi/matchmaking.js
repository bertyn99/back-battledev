const MAX_TIME_IN_QUEUE = 20000;
const POOL_POLL_INTERVAL = 1000;

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

      /**
       * @type {UnmatchedPlayer}
       */
      const p = {
        // parse message from client as UnmatchedPlayer
        id: player.id,
        time_joined: Date.now(),
        val_1: player.val_1,
        val_2: player.val_2,
      };
      // add player to pool if they are not already in pool
      if (!mm_pool.has(p.id)) {
        mm_pool.set(p.id, { socket: ws, player: p });
      } else {
        ws.close();
      }
    });

    // CHECK POOL FOR MATCHES EVERY POOL_POLL_INTERVAL / 1000 SECONDS
    setInterval(() => match_make(mm_pool), POOL_POLL_INTERVAL);

    // Client disconnect
    connection.socket.on("close", () => {
      console.log("Client disconnected");
    });
  },
};
export default matchmaking;
