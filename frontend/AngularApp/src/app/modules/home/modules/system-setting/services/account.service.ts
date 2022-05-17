import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  headers = new HttpHeaders();

  constructor(public http: HttpClient) { }

  getAllAccount (){
    return this.http.get('http://localhost:9002/hrm/account/loadAll', { headers: this.headers })
  }

  deactivateAccount(accountId: string){
    return this.http.post(`http://localhost:9002/hrm/account/deactivate/${accountId}`, { headers: this.headers})
  }

  activateAccount(accountId: string){
    return this.http.post(`http://localhost:9002/hrm/account/activate/${accountId}`, { headers: this.headers })
  }
    
  getAccountById (accountId: string){
    return this.http.get(`http://localhost:9002/hrm/account/getAccountById/${accountId}`, { headers: this.headers })
  }

  changePassword(data){
    return this.http.post(`http://localhost:9002/hrm/account/changePassword`, data, { headers: this.headers })
  }
}
