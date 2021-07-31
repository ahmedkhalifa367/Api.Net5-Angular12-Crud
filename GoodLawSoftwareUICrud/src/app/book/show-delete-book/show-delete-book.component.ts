import { Component, OnInit } from '@angular/core';
//import { IBook } from 'src/app/Interfaces/Book';
import {SharedService} from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-show-delete-book',
  templateUrl: './show-delete-book.component.html',
  styleUrls: ['./show-delete-book.component.css']
})
export class ShowDeleteBookComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }

  BookList:any=[];

  ModalTitle!:string;
  ActivateAddEditBookComp:boolean=false;
  //Book!:IBook;
  Book!:any;

  ngOnInit(): void {
    this.refreshBookList();
  }

  addClick(){
    this.Book={
      id:0,
      title:"",
      authorId:""
    }
    this.ModalTitle="Add Book";
    this.ActivateAddEditBookComp=true;

  }

  editClick(item: any){
    this.Book=item;
    this.ModalTitle="Edit Book";
    this.ActivateAddEditBookComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteBook(item.Id).subscribe(data=>{
        this.toastr.warning("Author deleted successfully")
        this.refreshBookList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditBookComp=false;
    this.refreshBookList();
  }


  refreshBookList(){
    this.service.getBookList().subscribe(data=>{
      this.BookList=data;
    });
  }

}
