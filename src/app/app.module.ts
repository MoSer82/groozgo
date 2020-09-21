import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToolbarComponent } from './news/toolbar/toolbar.component';
import { NewsService } from './news/news.service';
import { environment } from './../environments/environment';
import { CommonComponent } from './common/common.component';
import { PopupComponent } from './news/popup/popup.component';

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'news'
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CommonComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [ NewsService ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule { }
