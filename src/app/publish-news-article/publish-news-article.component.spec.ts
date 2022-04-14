import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNewsArticleComponent } from './publish-news-article.component';

describe('PublishNewsArticleComponent', () => {
  let component: PublishNewsArticleComponent;
  let fixture: ComponentFixture<PublishNewsArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishNewsArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishNewsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
