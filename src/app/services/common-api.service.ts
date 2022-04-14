import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CommonApiService {

    BASE_AUTH_API_URL = "https://localhost:7126/api";
    AUTH_API_URL = "https://localhost:7126/api/auth";
    NEWS_API_URL = "https://localhost:7051/api/news";
    COMMENTS_API_URL = "https://localhost:7190/api/comments";
}