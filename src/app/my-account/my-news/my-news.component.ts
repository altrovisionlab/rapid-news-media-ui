import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { NewsReport } from 'src/app/models/news-report';
import { NewsReportService } from 'src/app/services/news/news-report.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-my-news',
  templateUrl: './my-news.component.html',
  styleUrls: ['./my-news.component.css']
})
export class MyNewsComponent implements OnInit {
  myNewsReports = new Array<NewsReport>();

  constructor( private router: Router,
    private newsReportService: NewsReportService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.newsReportService.fetchNewsReportsByUser(this.authService.authUser.username).subscribe(
      (response: NewsReport[]) => {
        this.myNewsReports = response;
      }
    );
  }

  editNewsReport(newsReportId?: string){
    if(newsReportId != undefined){
      this.router.navigate([`/publish/news/${newsReportId}`]);
    } else {
      this.router.navigate([`/publish/news`]);
    }
    
  }

  deleteNewsReport(newsReportId: string) {
    this.newsReportService.deleteNewsReport(newsReportId).subscribe();
    this.newsReportService.deleteNewsReport(newsReportId).pipe(
      mergeMap(resopnse => {
        return this.newsReportService.fetchNewsReportsByUser(this.authService.authUser.username).pipe(
          map((reports: NewsReport[]) => {
            this.myNewsReports = reports;
          })
        );
      })
    ).subscribe();

  }

  publishNewsReport(newsReport: NewsReport) {
    newsReport.status = "published";
    this.newsReportService.updateNewsReport(newsReport).subscribe();
  }

}
