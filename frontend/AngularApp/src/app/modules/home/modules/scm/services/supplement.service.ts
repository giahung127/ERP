import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplementService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  addNewSupplement(data){
    return this.http.post('http://localhost:10003/scm/supplement/newSupplement',data, { headers: this.headers })
  }
  
  getAllSupplement (){
    return this.http.get('http://localhost:10003/scm/supplement/loadAll', { headers: this.headers })
  }

  getSupplementById(supplementId: string){
    return this.http.get(`http://localhost:10003/scm/supplement/getById/${supplementId}`, { headers: this.headers })
  }

  getSupplementBySupplierId(supplierId: string){
    return this.http.get(`http://localhost:10003/scm/supplement/getBySupplierId/${supplierId}`, { headers: this.headers })
  }

  getSupplementItemByProductId(productId: string){
    return this.http.get(`http://localhost:10003/scm/supplement/getSupplementItemByProductId/${productId}`, { headers: this.headers })
  }
}
