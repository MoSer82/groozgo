import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { PopupComponent } from './popup/popup.component';

export interface NewsItem {
  id?: string;
  author: string;
  date: string;
  authorname: string;
  caption: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  public newsCollection: AngularFirestoreCollection<NewsItem>;
  public newsList: Observable<NewsItem[]>;
  public author: string;
  public authorName: string;

  constructor(
    private fireStore: AngularFirestore,
    private authService: AngularFireAuth,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.newsCollection = fireStore.collection<NewsItem>('news');
    this.newsList = this.newsCollection.valueChanges();
  }

  get user() {
    return this.authService.user;
  }

  addNews(item: NewsItem) {
    const id = this.fireStore.createId();
    item.id = id;
    this.newsCollection.doc(id).set(item);
    this.snackBar.open('Новость добавлена', 'x', {
      duration: 3000
    });
  }

  getNews(id: string) {
    return this.newsCollection.doc(id).valueChanges();
  }

  saveNews(data: NewsItem) {
    this.newsCollection.doc(data.id).update(data);
    this.snackBar.open('Новость сохранена', 'x', {
      duration: 3000
    });
  }

  deleteNews(id: string) {
    const dialogRef = this.dialog.open(PopupComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newsCollection.doc(id).delete();
      }
    })
  }

  login() {
    this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.authService.auth.signOut();
    this.author = '';
    this.authorName = '';
  }

}
