import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EditorModule} from 'primeng/editor';
import { CommonApiService } from '../services/common-api.service';
import { NewsCategory } from '../models/news-category';
import { NewsReport } from '../models/news-report';
import { AuthService } from '../services/security/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NewsReportService } from '../services/news/news-report.service';

@Component({
  selector: 'app-publish-news-article',
  templateUrl: './publish-news-article.component.html',
  styleUrls: ['./publish-news-article.component.css']
})
export class PublishNewsArticleComponent implements OnInit {

  articleTitle: string;
  articleText: string;
  selectedNewsCategory: NewsCategory;
  allNewsCategories: NewsCategory [];
  imageUrl: string;
  uploadImgApi = this.commonApiService.NEWS_API_URL + "/image/upload";
  newsReportId: string;
  newsReportToUpdate: NewsReport;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private commonApiService : CommonApiService,
    private authService: AuthService,
    private newsReportService: NewsReportService
    ) 
    {

    this.allNewsCategories = [
      {label: "World News", code: "world" },
      {label: "Sport", code: "sport" },
      {label: "Business & Lifestyle", code: "business-lifestyle" },
      {label: "Tech & Science", code: "tech-science" }];

      
  }

  ngOnInit(): void {
    this.newsReportId = this.activatedRoute.snapshot.params.id;
      if(this.newsReportId != undefined && this.newsReportId != null){
        this.newsReportService.fetchNewsReport(this.newsReportId).subscribe(
          (response:NewsReport) => {
            if(response != undefined && response.id != undefined){
              this.articleTitle = response.title;
              this.articleText = response.description;
              this.imageUrl = response.imageUrl;
              this.newsReportToUpdate = response;
              this.allNewsCategories.forEach( item => {
                if(item.code == response.category){
                  this.selectedNewsCategory = item;
                }
              });
            }
          }
        )
        
      }
  }

  publishNewsReport(){
    let newsReport = new NewsReport();
    newsReport.title = this.articleTitle;
    newsReport.category = this.selectedNewsCategory.code;
    newsReport.description = this.articleText;
    newsReport.createdBy = this.authService.authUser.firstname + " " + this.authService.authUser.lastname;
    newsReport.createdByUsername = this.authService.authUser.username;
    newsReport.dateCreated = new Date();
    newsReport.status = "published";
    newsReport.imageUrl = this.imageUrl;

    if(this.newsReportId != undefined && this.newsReportId != null){
      newsReport.dateCreated = this.newsReportToUpdate.dateCreated;
      newsReport.lastModified = new Date();
      newsReport.id = this.newsReportToUpdate.id;

      // Update the News Report
      this.newsReportService.updateNewsReport(newsReport).subscribe(
        response => {
          this.navigateToArticle(this.newsReportId);
        }
      );
    } else {
      // Create a new News Report
      this.newsReportService.createNewsReport(newsReport).subscribe(
        (createdNewsReport: NewsReport) => {
          console.log("Successfully created news report!");
          console.log(JSON.stringify(createdNewsReport));
          //Navigate to the created news article
          this.navigateToArticle(createdNewsReport.id);
        }
      );
    }
    
    
  }

  navigateToArticle(newsReportId: string) {
    console.log(JSON.stringify(this.articleText));
    this.router.navigate([`/news/article/${newsReportId}`]);
  }

  fetchImage(event) {
    console.log(event);
    console.log(event.originalEvent.body);
    const imageId = event.originalEvent.body._id;
    this.imageUrl = this.uploadImgApi + "/" + imageId;
  }

}
