import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';
import { IAuthor } from 'src/app/Interfaces/Author';
@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }

  @Input() book:any;
  BookId!:string;
  BookTitle!:string;
  Author!:string;

  AuthorList:any=[];

  ngOnInit(): void {
    this.loadAuthorList();
  }

  loadAuthorList(){
    this.service.getAuthorList().subscribe((data:any)=>{
      this.AuthorList=data;
      this.BookId=this.book.id;
      this.BookTitle=this.book.title;
      if(this.book){
        this.Author=this.book.authorId
      }
    });
  }

  addBook(){
    var val = {title:this.BookTitle,authorid:this.Author};
    this.service.addBook(val).subscribe(res=>{
      this.toastr.success("Book " + val.title.toString() +" was added successfully")
    });
  }

  updateBook(){
    var val = {id:this.BookId,
      title:this.BookTitle,
      authorid:this.Author};

    this.service.updateBook(val).subscribe(res=>{
      this.toastr.success("Book " + val.title.toString() +" was updated successfully")
    });
  }


}
