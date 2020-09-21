import { Component, OnInit } from '@angular/core';
import { NewsService } from './../news.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public service: NewsService
  ) { }

  ngOnInit() {
    this.service.user.subscribe((data) => {
      if (data) {
        this.service.author = data.email;
        this.service.authorName = data.displayName;        
      }
    })
  }

}
