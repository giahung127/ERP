import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllCategory (){
    return this.http.get('http://localhost:10003/scm/category/loadAll', { headers: this.headers })
  }

  addNewCategory(data){
    return this.http.post('http://localhost:10003/scm/category/addCategory',data, { headers: this.headers })
  }

  updateCategoryById(data){
    return this.http.post('http://localhost:10003/scm/category/updateById',data, { headers: this.headers })
  }
}
