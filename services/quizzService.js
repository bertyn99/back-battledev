import ApiService from "./apiService.js";

class Quizz {
  constructor(category) {
    this.category = category;
    this.urlApi = "https://opentdb.com/api.php";
    this.apiService = new ApiService(this.urlApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(this.apiService.get);
  }

  async getQuestions() {
    let a = await this.apiService.get("?amount=10").json();
    return a.results;
  }

  setCategory(category) {}
}
const QuizzService = new Quizz("");
export default QuizzService;
