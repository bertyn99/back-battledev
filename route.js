import { Router } from "express";
import user from "./controllers/user.js";
import battle from "./controllers/battle.js";
import leaderboard from "./controllers/leaderboard.js";
import quizz from "./controllers/quizz.js";
import verifyToken from "./services/verifyToken.js";

export const router = (function () {
  let apiRouter = Router();

  //healthCheck
  apiRouter.get("/", (req, res) => {
    res.send("API is running");
  });

  ////////////////////////
  ////   User         ////
  ////////////////////////
  // register user
  apiRouter.route("/register").post(user.register);

  // connection user
  apiRouter.route("/login").post(user.logIn);

  // deconnection user
  apiRouter.route("/logout").get(verifyToken, user.logOut);

  /*   // reconnect user
    apiRouter.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiRouter.route("/user/me").get(verifyToken, user.myInfo);

  // edit profile
  apiRouter.route("/user/:id/edit").patch(verifyToken, user.updateInfo);

  ////////////////////////
  ////   Quizz         ///
  ////////////////////////

  //get quetsion
  apiRouter.route("/quizz").get(quizz.getQuizz);

  ////////////////////////
  ////   Battle        ///
  ////////////////////////
  apiRouter.route("/battle").post(verifyToken, battle.addResultBattle);

  //personal history
  apiRouter
    .route("/user/:idUser/battle")
    .get(verifyToken, battle.showBattlesHistory);

  ////////////////////////
  ////   leaderboard   ///
  ////////////////////////

  apiRouter
    .route("/leaderboard")
    .get(verifyToken, leaderboard.getFullLeaderboard);
  apiRouter
    .route("/leaderboard/me")
    .get(verifyToken, leaderboard.getSurroundLeaderboard);
  /*  
 
   // info user
   apiRouter.route("/info/:id").get(verifyToken, user.infoUser);
 
   
 
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  return apiRouter;
})();
