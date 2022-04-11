import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllPriceList (){
    return this.http.get('http://localhost:9004/sale/price_list/loadAll', { headers: this.headers })
  }

  getPriceListById(priceListId: string){
    return this.http.get(`http://localhost:9004/sale/price_list/getById/${priceListId}`, { headers: this.headers })
  }

  addNewPriceList(data){
    return this.http.post('http://localhost:9004/sale/price_list/addNew', data, { headers: this.headers })
  }

  addProductToPriceList(data) {
    return this.http.post('http://localhost:9004/sale/price_list/newProduct', data, { headers: this.headers })
  }
}
