import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Account } from '../../home/modules/shared/models/account/account.model';
import { AccountService } from '../../home/modules/system-setting/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders();

  constructor(
    public http: HttpClient, 
    private accountService: AccountService
    ) { }
  

  public account?: Account = undefined;

  login(username: string, password: string) {
    return this.http.post('http://localhost:9002/hrm/account/login', { username: username, password: password }, { headers: this.headers })
  }

  setLocalAccount(account : Account){
    this.account = account;
  }

  async updateProfile() {
    const res = await this.accountService.getAccountById(<string>localStorage.getItem('accountId')).toPromise();
    return res;
  }

  

  async getProfile(){
    if (!this.account) {
      const res = await this.updateProfile();
      let temp;
      temp = res
      this.account = {
        'accountId': temp.data.id,
        'username': temp.data.username,
        'employeeId': temp.data.employeeId,
        'status': temp.data.accountStatus,
        'employeeName': temp.data.employeeName
      };
    }
    return this.account;
  }

  logout() {
    localStorage.removeItem('accountId');
  }

  public isLoggedIn() {
    if (localStorage.getItem('accountId')){
        return true;
    }
    return false;
  }

  resetProfile() {
    this.account = undefined;
  }
}
