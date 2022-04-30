import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllSupplier (){
    return this.http.get('http://localhost:10003/scm/supplier/getAll', { headers: this.headers })
  }

  getSupplierById (supplierId: string){
      return this.http.get(`http://localhost:10003/scm/supplier/getById/${supplierId}`, { headers: this.headers })
  }

  addNewSupplier(data){
    return this.http.post('http://localhost:10003/scm/supplier/newSupplier',data, { headers: this.headers })
  }

  updateSupplierById(data){
    return this.http.post('http://localhost:10003/scm/supplier/update',data, { headers: this.headers })
  }
}
