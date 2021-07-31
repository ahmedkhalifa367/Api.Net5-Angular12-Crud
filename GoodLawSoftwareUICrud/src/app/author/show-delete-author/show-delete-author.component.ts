import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-show-delete-author',
  templateUrl: './show-delete-author.component.html',
  styleUrls: ['./show-delete-author.component.css']
})
export class ShowDeleteAuthorComponent implements OnInit {

  constructor(private service:SharedService,private toastr: ToastrService) { }

  AuthorList:any=[];
  ModalTitle!:string;
  ActivateAddEditAuthorComp:boolean=false;
  Author:any;
  bootbox:any;
  AuthorIdFilter:string="";
  AuthorNameFilter:string="";
  AuthorListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshAuthorList();
  }

  addClick(){
    this.Author={
      id:0,
      name:""
    }
    this.ModalTitle="Add Author";
    this.ActivateAddEditAuthorComp=true;
  }

  editClick(item: any){
    this.Author=item;
    this.ModalTitle="Edit Author";
    this.ActivateAddEditAuthorComp=true;
  }

  deleteClick(item: any){
    //bootbox.alert('Are you sure??');
    if(confirm('Are you sure??')){
      this.service.deleteAuthor(item.id).subscribe(data=>{
        this.toastr.warning("Author deleted successfully")
        this.refreshAuthorList();
      })
    }
  }



  closeClick(){
    this.ActivateAddEditAuthorComp=false;
    this.refreshAuthorList();
  }


  refreshAuthorList(){
      this.service.getAuthorList().subscribe((data: any)=>{
      this.AuthorList=data;
      this.AuthorListWithoutFilter=data;
    });
  }

  FilterFn(){
    var AuthorIdFilter = this.AuthorIdFilter;
    var AuthorNameFilter = this.AuthorNameFilter;

    this.AuthorList = this.AuthorListWithoutFilter.filter(function (el: { id: { toString: () => string; }; name: { toString: () => string; }; }){
        return el.id.toString().toLowerCase().includes(
          AuthorIdFilter.toString().trim().toLowerCase()
        )&&
        el.name.toString().toLowerCase().includes(
          AuthorNameFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop: string | number,asc: any){
    this.AuthorList = this.AuthorListWithoutFilter.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }

}
