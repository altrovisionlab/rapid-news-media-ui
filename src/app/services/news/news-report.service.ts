import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewsReport } from "src/app/models/news-report";
import { CommonApiService } from "../common-api.service";

@Injectable({
    providedIn: "root",
  })
  export class NewsReportService {

    private _baseUri: string = this.commonApi.NEWS_API_URL;

    constructor(private http: HttpClient, private commonApi: CommonApiService) {}

    createNewsReport(newsReport : NewsReport){
        return this.http.post(this._baseUri, newsReport);
    }

    updateNewsReport(newsReport: NewsReport){
        return this.http.put(this._baseUri + `/${newsReport.id}`, newsReport);
    }

    fetchNewsReport(newsReportId: string) {
        return this.http.get(this._baseUri + "/" + newsReportId);
    }

    fetchAllNewsReports(category?:string){
        let queryParam = (category != undefined && category != null) ? "?category=" + category : "";
        return this.http.get(this._baseUri + queryParam);
    }

    fetchNewsReportsByUser(username: string){
        return this.http.get(this._baseUri + `?username=${username}`);
    }

    deleteNewsReport(newsReportId: string){
        return this.http.delete(this._baseUri + "/" + newsReportId);
    }
  }