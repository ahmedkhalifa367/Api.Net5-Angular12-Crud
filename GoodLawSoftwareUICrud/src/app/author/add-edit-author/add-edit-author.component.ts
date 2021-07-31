import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-edit-author',
  templateUrl: './add-edit-author.component.html',
  styleUrls: ['./add-edit-author.component.css']
})
export class AddEditAuthorComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }

  @Input() Author:any;
  AuthorId!:number;
  AuthorName!: string;

  ngOnInit(): void {
    this.AuthorId=this.Author.id;
    this.AuthorName=this.Author.name;
  }

  addAuthor(){
    var val = {name:this.AuthorName};
    this.service.addAuthor(val).subscribe(res=>{
      this.toastr.success("Author " + val.name.toString() +" was added successfully")
    });

  }

  updateAuthor(){
    var val = {id:this.AuthorId,name:this.AuthorName};
    console.log(val);
    this.service.updateAuthor(val).subscribe(res=>{
      this.toastr.success("Author " + val.name.toString() +" was updated successfully")
    });
  }



}
