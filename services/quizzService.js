import ApiService from "./apiService.js";

class Quizz {
  constructor() {
    this.category = "";
    this.urlApi = "https://opentdb.com/api.php";
    this.apiService = new ApiService(this.urlApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(this.apiService.get);
  }

  async getQuestions() {
    let withCat = this.category.length > 0 ? `&category=${this.category}` : "";
    let a = await this.apiService.get("?amount=10" + withCat).json();
    return a.results;
  }

  setCategory(category) {
    this.category = category;
  }
}
const QuizzService = new Quizz();
export default QuizzService;
