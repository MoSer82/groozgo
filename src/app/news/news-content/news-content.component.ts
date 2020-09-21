import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NewsService, NewsItem } from './../news.service';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit {
  @Input() type: string;
  @Input() item: NewsItem;
  @Input() edit: boolean;

  public form = new FormGroup({
    caption: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  })

  constructor(
    private service: NewsService,
    private router: Router
  ) {
    service.user.subscribe(data => {
      if (!data || !data.providerId) {
        this.edit = false;
        this.form.disable();
      } else {
        if (data.email == this.item.author) {
          router.navigate(['news', this.item.id, 'edit']);
          this.form.enable();
          this.edit = true;
        }
      }
    })
  }

  ngOnInit() {
    if (this.item) {
      this.form.patchValue(this.item);
      if (!this.edit) {
        this.form.disable();
      }
    }
  }

  addNews() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let item: NewsItem = {} as NewsItem;
      item.author = this.service.author;
      item.authorname = this.service.authorName;
      item.caption = this.form.get('caption').value;
      item.date = moment(new Date()).format('DD.MM.YYYY');
      item.text = this.form.get('text').value;
      this.service.addNews(item);
      this.router.navigate(['news']);      
    }
  }

  saveNews() {
    this.form.markAllAsTouched();
    if (this.item && this.form.valid) {
      this.item.caption = this.form.get('caption').value;
      this.item.text = this.form.get('text').value;
      this.service.saveNews(this.item);
      this.router.navigate(['news']);
    }
  }

}
