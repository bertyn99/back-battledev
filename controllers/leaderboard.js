import { successRes, errorRes } from "../common/response.js";
import Battle from "../db/model/battle.js";
import User from "../db/model/user.js";

const leaderboard = {
  getFullLeaderboard: async function (req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const leaderboard = await User.find()
        .select("username quizzPoints badges")
        .sort({ quizzPoints: "desc" })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const countPlayer = await User.find().count();
      successRes(res, { total: countPlayer, leaderboard }, 201);
    } catch (e) {
      errorRes(res, e, e.message, 500);
    }
  },
  getSurroundLeaderboard: async function (req, res) {
    try {
      const { quizzPoints } = req.user;
      const leaderboard = await User.find()
        .where({ quizzPoints: { $lte: quizzPoints + 5 } })
        .select("username quizzPoints badges")
        .sort({ quizzPoints: "desc" })
        .limit(10);

      const totalPlayer = await User.find().count();
      successRes(res, { total: totalPlayer, leaderboard }, 201);
    } catch (e) {
      errorRes(res, e, e.message, 500);
    }
  },
};

export default leaderboard;
