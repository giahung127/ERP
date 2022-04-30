import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }


  addNewSupplement(data){
    return this.http.post('http://localhost:10003/scm/supplement/newSupplement',data, { headers: this.headers })
  }

}
