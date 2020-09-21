import { Component, OnInit } from '@angular/core';
import { NewsItem } from './../news.service';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {

  public item: NewsItem;

  constructor() { }

  ngOnInit() {
    this.item = {} as NewsItem;
  }

}
