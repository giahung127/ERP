import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderList: Order[] | undefined

  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getLocalList(){
    return this.orderList
  }

  setLocalList(orderList: Order[]){
    this.orderList = orderList;
  }

  getLocalById(orderId: string){
    return this.orderList?.find((order) => {return order.orderId === orderId})
  }

  getAllOrdersList (){
    return this.http.get('http://localhost:9004/sale/order/loadAll', { headers: this.headers })
  }

  getOrderById(orderId: string){
    return this.http.get(`http://localhost:9004/sale/order/getById/${orderId}`, { headers: this.headers })
  }

  getOrderByStatus(orderStatus: string){
    return this.http.get(`http://localhost:9004/sale/order/getOrderByStatus`, { headers: this.headers, params: {orderStatus: orderStatus} })
  }  
  
  cancelOrderById(orderId: string){
    return this.http.get(`http://localhost:9004/sale/order/cancelOrder/${orderId}`, { headers: this.headers })
  }

  createNewOrder(data){
    return this.http.post(`http://localhost:9004/sale/order/newOrder`,data, { headers: this.headers })
  }
  
  updateOrderStatus(data){
      return this.http.post(`http://localhost:9004/sale/order/updateStatus`,data, { headers: this.headers })
  } 

  getOrderByCustomerId(customerId: string){
    return this.http.get(`http://localhost:9004/sale/order/getOrdersByCustomerId/${customerId}`, { headers: this.headers })
  }

  getOrderByListIds(ids: string[]){
    return this.http.get(`http://localhost:9004/sale/order/getListOrderByIds`,{
      headers: this.headers,
      params: {
        ids: ids
      }
    })
  }
}
