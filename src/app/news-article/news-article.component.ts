import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsReport } from '../models/news-report';
import { NewsReportService } from '../services/news/news-report.service';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {

  newsReport: NewsReport = new NewsReport();
  newsReportId: string;

  constructor(
    private route: ActivatedRoute,
    private newsReportService: NewsReportService
  ) { }

  ngOnInit(): void {
    this.newsReportId = this.route.snapshot.params.id;
    this.newsReportService.fetchNewsReport(this.newsReportId).subscribe(
      (response: NewsReport) => {
        this.newsReport = response;
      }
    );
    
  }

}
