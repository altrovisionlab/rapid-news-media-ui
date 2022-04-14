import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { concatMap, map, mergeMap, take, } from 'rxjs/operators';
import { NewsReport } from '../models/news-report';
import { NewsReportService } from '../services/news/news-report.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  allNewsReports: NewsReport[];
  headlineNews : NewsReport = new NewsReport();
  newsCategory: string;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private newsReportService: NewsReportService) { }

  ngOnInit(): void {
    this.allNewsReports = new Array<NewsReport>();
    
    this.activatedRouter.params.pipe(
      mergeMap(params => {
        return this.newsReportService.fetchAllNewsReports(params['category']).pipe(
          map(news => news)
        );
      }),
      map((news: NewsReport[]) =>{
        this.allNewsReports = new Array<NewsReport>();
        this.headlineNews = new NewsReport();
        if(news.length > 0){
          //Setting the first article from the list as Headline News
          this.headlineNews = news.shift();
          news.forEach( item => this.allNewsReports.push(item));
        }
      })
    ).subscribe();

    

    //this.newsCategory = this.activatedRouter.snapshot.params.category;
    /*
    let newsReportsObs$ = this.newsReportService.fetchAllNewsReports(this.newsCategory).pipe(take(1), map(
      (newsReports: NewsReport[]) => {
        if(newsReports.length > 0){
          //Setting the first article from the list as Headline News
          this.headlineNews = newsReports.shift();
          newsReports.forEach( item => this.allNewsReports.push(item));
        }
      }
    ));
    */
  }

  

  navigateToArticle(newsReportId) {
    this.router.navigate([`/news/article/${newsReportId}`]);
  }

}
