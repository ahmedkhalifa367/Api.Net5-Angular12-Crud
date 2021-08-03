import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="https://localhost:44370/api";

    constructor(private http:HttpClient) { }

    getAuthorList():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'/Authors');
    }

    addAuthor(val:any){
      return this.http.post(this.APIUrl+'/Authors',val);
    }

    updateAuthor(val:any){
      return this.http.put(this.APIUrl+'/Authors/'+val.id,val);
    }

    deleteAuthor(val:any){
      return this.http.delete(this.APIUrl+'/Authors/'+val);
    }


    getBookList():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'/Books');
    }

    addBook(val:any){
      return this.http.post(this.APIUrl+'/Books',val);
    }

    updateBook(val:any){
      return this.http.put(this.APIUrl+'/Books/'+val.id,val);
    }

    deleteBook(val:any){
      return this.http.delete(this.APIUrl+'/Books/'+val);
    }

}
