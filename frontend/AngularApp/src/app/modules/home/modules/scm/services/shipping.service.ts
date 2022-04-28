import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllShipment (){
    return this.http.get('http://localhost:10003/scm/shipment/loadAll', { headers: this.headers })
  }

  getShipmentById(id: string){
    return this.http.get(`http://localhost:10003/scm/shipment/getById/${id}`  , { headers: this.headers })
  }

  getShipmentByOrderId(orderId: string){
    return this.http.get(`http://localhost:10003/scm/shipment/getByOrderId/${orderId}`  , { headers: this.headers })
  }

  addNewShipment(data){
    return this.http.post('http://localhost:10003/scm/shipment/newShipment',data, { headers: this.headers })
  }

  updateShipmentById(data){
    return this.http.post('http://localhost:10003/scm/shipment/updateById',data, { headers: this.headers })
  }
}
