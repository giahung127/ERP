import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getCompanyInfo (){
    return this.http.get('http://localhost:9002/hrm/companyInfo/getInfo', { headers: this.headers })
  }

  updateCompanyInfo(data){
    return this.http.post('http://localhost:9002/hrm/companyInfo/newCompanyInfo',data, { headers: this.headers })
  }
}
