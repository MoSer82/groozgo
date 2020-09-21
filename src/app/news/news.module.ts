import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewsComponent } from './news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { NewsContentComponent } from './news-content/news-content.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NewsComponent
      },
      {
        path: 'create',
        component: CreateNewsComponent
      },
      {
        path: ':id',
        component: EditNewsComponent,
        data: { action: 'read' }
      },
      {
        path: ':id/edit',
        component: EditNewsComponent,
        data: { action: 'edit' }
      }
    ]
    
  }
]

@NgModule({
  declarations: [
    NewsComponent,
    CreateNewsComponent,
    EditNewsComponent,
    NewsContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports: [
    RouterModule
  ]
})
export class NewsModule { }
