import database from "../db/mongoDB.js";
import { successRes, errorRes } from "../common/response.js";
import Battle from "../db/model/battle.js";
import User from "../db/model/user.js";

const battle = {
  addResultBattle: async function (req, res) {
    try {
      // check if its a of battle the current user participate
      const isParticipating = req.body.idOpponents.includes(req.user.id);
      if (!isParticipating)
        throw new Error("You didnt participate in this battle");

      // check if the winner is  participating
      const isWinnerParticipating = req.body.idOpponents.includes(
        req.body.winner
      );
      if (!isWinnerParticipating)
        throw new Error("You didnt participate in this battle");

      // save thez battle data

      const battle = new Battle(req.body);

      await battle.save();

      //loop through the opponents
      for (let opponent of req.body.idOpponents) {
        const user = await User.findById(opponent);
        if (user.id == req.body.winner) {
          await user.addScoreBattle(req.body.quizzpoints[0]);
        } else {
          await user.addScoreBattle(req.body.quizzpoints[1]);
        }
      }

      successRes(res, { msg: "Resultat de battle enregistrer" }, 201);
    } catch (e) {
      errorRes(res, e, e.message, 500);
    }
  },

  showBattlesHistory: async function (req, res) {
    //user data
    let user;
    try {
      if (req.params.idUser !== req.user.id) {
        let u = await User.findOne({ _id: req.params.idUser });
        user = u.toJSON();
      }
      user = req.user.toJSON();

      //get Battles of the current user
      const battles = await Battle.findBattlesOfthisUser(user._id);

      successRes(res, battles, 201);
    } catch (e) {
      errorRes(res, e, e.message, 500);
    }
  },
};

export default battle;
