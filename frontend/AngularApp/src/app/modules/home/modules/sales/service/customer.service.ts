import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllCustomerList (){
    return this.http.get('http://localhost:9004/sale/customer/loadAll', { headers: this.headers })
  }

  getCustomerById(customerId: string){
    return this.http.get(`http://localhost:9004/sale/customer/getById/${customerId}`, { headers: this.headers })
  }

  createNewCustomer(data){
    return this.http.post(`http://localhost:9004/sale/customer/newCustomer`,data, { headers: this.headers })
  }
}
