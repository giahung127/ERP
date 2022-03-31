import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllOrdersList (){
    return this.http.get('http://localhost:9004/sale/order/loadAll', { headers: this.headers })
  }

  createNewOrder(data){
    return this.http.post(`http://localhost:9004/sale/order/newOrder`,data, { headers: this.headers })
  }
  
}
