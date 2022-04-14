import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comment } from "src/app/models/comment";
import { CommonApiService } from "../common-api.service";

@Injectable({
    providedIn: "root",
  })
  export class CommentsService{

    private _baseUri: string = this.commonApi.COMMENTS_API_URL;

    constructor(private http: HttpClient, private commonApi: CommonApiService) {}

    fetchCommentsByNewsReport(newsReportId: string){
        return this.http.get(this._baseUri + "?newsReportId=" + newsReportId);
    }

    submitComment(comment: Comment){
        return this.http.post(this._baseUri, comment);
    }
  }