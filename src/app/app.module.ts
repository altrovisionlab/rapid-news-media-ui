import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { IconsModule } from './icons/icons.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {InputSwitchModule} from 'primeng/inputswitch';
import {BadgeModule} from 'primeng/badge';
import {ToastModule} from 'primeng/toast';
import {TimelineModule} from 'primeng/timeline';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import { NewsComponent } from './news/news.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { PublishNewsArticleComponent } from './publish-news-article/publish-news-article.component';
import { EditorModule } from 'primeng/editor';
import {DialogModule} from 'primeng/dialog';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-account/my-profile/my-profile.component';
import { MyNewsComponent } from './my-account/my-news/my-news.component';
import { NewsCommentsComponent } from './news-comments/news-comments.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    NewsComponent,
    NewsArticleComponent,
    PublishNewsArticleComponent,
    MyAccountComponent,
    MyProfileComponent,
    MyNewsComponent,
    NewsCommentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    IconsModule,
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    FileUploadModule,
    InputSwitchModule,
    BadgeModule,
    ToastModule,
    TimelineModule,
    InputTextModule,
    CardModule,
    CalendarModule,
    EditorModule,
    DialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
