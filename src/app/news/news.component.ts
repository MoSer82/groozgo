import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService, NewsItem } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public newsList: Observable<NewsItem[]>;

  constructor(
    public service: NewsService,
    private router: Router
  ) {
    this.newsList = service.newsList;
  }

  ngOnInit() {
  }

  login() {
    this.service.login();
  }

  logout() {
    this.service.logout();
  }

  addNews() {
    this.router.navigate(['news', 'create']);
  }

  readNews(id: string) {
    this.router.navigate(['news', id]);
  }

  editNews(id: string) {
    this.router.navigate(['news', id, 'edit']);
  }

  deleteNews(id: string) {
    this.service.deleteNews(id);
  }

}
