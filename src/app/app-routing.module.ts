import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './my-account/my-account.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsComponent } from './news/news.component';
import { PublishNewsArticleComponent } from './publish-news-article/publish-news-article.component';


const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'news/world'},
  {path: 'news/:category', component: NewsComponent},
  {path: 'publish/news', component: PublishNewsArticleComponent},
  {path: 'publish/news/:id', component: PublishNewsArticleComponent},
  {path: 'news/article/:id', component: NewsArticleComponent},
  {path: 'my-account', component: MyAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
