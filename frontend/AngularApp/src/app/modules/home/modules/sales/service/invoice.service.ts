import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllInvoiceList (){
    return this.http.get('http://localhost:9004/sale/invoice/getAll', { headers: this.headers })
  }

  getInvoiceById(orderId: string){
    return this.http.get(`http://localhost:9004/sale/invoice/getById/${orderId}`, { headers: this.headers })
  }

  createNewInvoice(data){
    return this.http.post(`http://localhost:9004/sale/invoice/newInvoice`,data, { headers: this.headers })
  }
  
  updateInvoiceStatus(data){
    return this.http.post(`http://localhost:9004/sale/invoice/updateStatus`,data, { headers: this.headers })
  } 

  getInvoiceByListIds(ids: string[]){
    return this.http.get(`http://localhost:9004/sale/invoice/getListInvoiceByIds`,{
      headers: this.headers,
      params: {
        ids: ids
      }
    })
  }
}
