import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthorComponent } from './author/author.component';
import { AddEditAuthorComponent } from './author/add-edit-author/add-edit-author.component';
import { ShowDeleteAuthorComponent } from './author/show-delete-author/show-delete-author.component';

import { BookComponent } from './book/book.component';
import { AddEditBookComponent } from './book/add-edit-book/add-edit-book.component';
import { ShowDeleteBookComponent } from './book/show-delete-book/show-delete-book.component';

import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    AddEditAuthorComponent,
    BookComponent,
    ShowDeleteAuthorComponent,
    AddEditBookComponent,
    ShowDeleteBookComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
