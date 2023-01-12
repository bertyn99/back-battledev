import ApiService from "./apiService.js";

class Quizz {
  constructor() {
    this.category = "";
    this.urlApi = "https://opentdb.com/";
    this.apiService = new ApiService(this.urlApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getQuestions() {
    let withCat = this.category.length > 0 ? `&category=${this.category}` : "";
    let a = await this.apiService.get("api.php?amount=10" + withCat).json();
    return a.results;
  }

  setCategory(category) {
    this.category = category;
  }

  async getCategories() {
    let category = await this.apiService.get("api_category.php").json();
    return category.trivia_categories;
  }
}
const QuizzService = new Quizz();
export default QuizzService;
