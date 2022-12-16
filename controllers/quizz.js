import database from "../db/connexion.js";
import { successRes, errorRes } from "../common/response.js";
import { default as quizzService } from "../services/quizzService.js";

async function getQuizz(req, res) {
  try {
    console.log("ici");
    let q = await quizzService.getQuestions();
    if (q) return successRes(res, q);
  } catch (error) {}
}

export default { getQuizz };
