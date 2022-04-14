import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { CommentsService } from '../services/comments/comments.service';
import { AuthService } from '../services/security/auth.service';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.css']
})
export class NewsCommentsComponent implements OnInit {

  @Input() newsReportId = '';
  commentsUnavailable = false;

  comment: string;
  listComments : Comment[] = [];

  constructor(
    public authService : AuthService,
    private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.fetchCommentsByNewsReport(this.newsReportId).subscribe(
      (response:Comment[]) => {
        response.forEach(
          comment => {
            this.listComments.push(comment);
          }
        )
      },
      error => {
        this.commentsUnavailable = true;
      }
    );
  }

  submitComment() {
    let newComment = new Comment();
    newComment.description = this.comment;
    newComment.newsReportId = this.newsReportId;
    newComment.createdBy = this.authService.authUser.firstname + " " + this.authService.authUser.lastname;
    newComment.createdByUsername = this.authService.authUser.email;
    newComment.dateCreated = new Date();
    this.commentsService.submitComment(newComment).subscribe(
      response => {
        console.log("Successfully submited new comment!");
        this.listComments.push(newComment);
        this.comment = "";
      }
    );
    
  }

}
