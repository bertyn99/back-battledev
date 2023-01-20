import ApiService from "./apiService.js";

export class AvatarService {
  constructor() {
    this.style = "identicon/svg";
    this.urlApi = "https://api.dicebear.com/5.x/";
    this.apiService = new ApiService(this.urlApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getRandomAvatar(name) {
    return this.urlApi + this.style + `?seed=${name}` + "&rowColor=5e35b1";
  }
}
