import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  needItemList: {productId: string, amount: number}[] | undefined;
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  setLocalNeedItem(needItemList: {productId: string, amount: number}[]){
    this.needItemList = needItemList;
  }

  getLocalNeedItem(){
    return this.needItemList
  }

  getAllProduct (){
    return this.http.get('http://localhost:10003/scm/product/loadAll', { headers: this.headers })
  }

  getProductById(id: string){
    return this.http.get(`http://localhost:10003/scm/product/getById/${id}`  , { headers: this.headers })

  }

  addNewProduct(data){
    return this.http.post('http://localhost:10003/scm/product/addProduct',data, { headers: this.headers })
  }
}
