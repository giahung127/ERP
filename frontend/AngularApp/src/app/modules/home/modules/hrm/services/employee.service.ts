import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllEmployee (){
    return this.http.get('', { headers: this.headers })
  }
}
