import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, NewsItem } from './../news.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  public type: string;
  public id: string;
  public item: NewsItem;
  public isAuthor: boolean;

  constructor(
    private service: NewsService,
    private acRoute: ActivatedRoute
  ) {
    acRoute.params.subscribe(params => this.id = params['id']);
    acRoute.data.subscribe(data => this.type = data.action);
  }

  ngOnInit() {
    this.service.getNews(this.id).subscribe((data: NewsItem) => {
      this.item = data;
      this.isAuthor = (this.item.author && this.item.author == this.service.author);
    })
  }

}
