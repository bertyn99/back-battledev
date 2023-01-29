import user from "./controllers/user.js";
import battle from "./controllers/battle.js";
import leaderboard from "./controllers/leaderboard.js";
import quizz from "./controllers/quizz.js";

export default function (fastify, opt, done) {
  //healthCheck
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
    },

    (req, res) => {
      res.send("API is running");
    }
  );

  ////////////////////////
  ////   User         ////
  ////////////////////////
  // register user
  fastify.post("/register", user.register);

  // connection user
  fastify.post("/login", user.logIn);

  // deconnection user
  fastify.post("/logout", user.logOut);

  /*   // reconnect user
    fastify.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  fastify.get(
    "/user/me",
    {
      preHandler: [fastify.authenticate],
    },
    user.myInfo
  );

  //other  user info
  fastify.get(
    "/user/:id",
    {
      preHandler: [fastify.authenticate],
    },
    user.userInfo
  );

  // edit profile
  fastify.patch(
    "/user/:id/edit",
    {
      preHandler: [fastify.authenticate],
    },
    user.updateInfo
  );

  ////////////////////////
  ////   Quizz         ///
  ////////////////////////

  //get quetsion
  fastify.get("/quizz", quizz.getQuizz);
  //get category
  fastify.get("/quizz/category", quizz.getCategoryQuizz);
  ////////////////////////
  ////   Battle        ///
  ////////////////////////
  fastify.post(
    "/battle",
    {
      preHandler: [fastify.authenticate],
    },
    battle.addResultBattle
  );

  //personal history
  fastify.get(
    "/user/:idUser/battle",
    {
      preHandler: [fastify.authenticate],
    },
    battle.showBattlesHistory
  );

  ////////////////////////
  ////   leaderboard   ///
  ////////////////////////

  fastify.get("/leaderboard", leaderboard.getFullLeaderboard);
  fastify.get(
    "/leaderboard/me",
    {
      preHandler: [fastify.authenticate],
    },

    leaderboard.getSurroundLeaderboard
  );
  /*  
 
   // info user
   fastify.route("/info/:id").get user.infoUser);
 
   
 
   // lost password - client
   fastify.route("/lost").post(user.lostPassword);
 
   // lost password - website
   fastify.route("/lost/reset").post(user.resetPassword); */
  done();
}
