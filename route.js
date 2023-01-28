import user from "./controllers/user.js";
import battle from "./controllers/battle.js";
import leaderboard from "./controllers/leaderboard.js";
import quizz from "./controllers/quizz.js";
import verifyToken from "./services/verifyToken.js";

export default function (fastify, opt, done) {
  //healthCheck
  fastify.get("/", {
    preHandler: (req, res, done) => {
      console.log("middel");
      done();
    },
    handler: (req, res) => {
      res.send("API is running");
    },
  });

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
  fastify.get("/user/me", user.myInfo);

  //other  user info
  fastify.get("/user/:id", user.userInfo);

  // edit profile
  fastify.patch("/user/:id/edit", user.updateInfo);

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
  fastify.post("/battle", battle.addResultBattle);

  //personal history
  fastify.get("/user/:idUser/battle", battle.showBattlesHistory);

  ////////////////////////
  ////   leaderboard   ///
  ////////////////////////

  fastify.get("/leaderboard", leaderboard.getFullLeaderboard);
  fastify.get(
    "/leaderboard/me",

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
