import database from "../db/mongoDB.js";
import { successRes, errorRes } from "../common/response.js";
import { default as quizzService } from "../services/quizzService.js";

/**
 * TODO:
 * - [x]getQuestion
 * - [x]getCategory
 * - []getScoreOfQuestion
 */

async function getQuizz(req, res) {
  try {
    const { category } = req.query;
    if (category) quizzService.setCategory(category);
    let q = await quizzService.getQuestions();
    if (q) return successRes(res, q);
  } catch (error) {
    return errorRes(res, error);
  }
}

async function getCategoryQuizz(req, res) {
  try {
    let q = await quizzService.getCategories();
    if (q) return successRes(res, q);
  } catch (error) {
    return errorRes(res, error);
  }
}

export default { getQuizz, getCategoryQuizz };
