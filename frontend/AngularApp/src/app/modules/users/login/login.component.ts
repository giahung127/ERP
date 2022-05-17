import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
// import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username = '';
    password = '';
    error = { check: false, message: '' };
    headers = new HttpHeaders();

    constructor( 
        private router: Router, 
        public http: HttpClient,
        private userService: UserService
        ) {}

    login() {
        this.userService.login(this.username, this.password)
            .subscribe(
            (res) => {
                let temp;
                temp = res;
                if (temp.code === '200') {
                    localStorage.setItem('accountId', temp.data.id);
                    this.userService.setLocalAccount(temp.data)
                    if(temp.data.accountStatus === 'PENDING'){
                        this.router.navigateByUrl('/users/activate');
                    }
                    else {
                        this.router.navigateByUrl('/home');
                    }
                    this.error.check = false;
                }
                else if(temp.code === '404') {
                    this.error.message = temp.message;
                    this.error.check = true;
                }
            },
            (err: HttpErrorResponse) => {
            },
            () => {
                // Finalize here
            }
        );
    }
    onChangeEvent(e) {
        if (e.keyCode === 13) {
            this.login();
        }
        this.error.check = false;
    }
    onButtonClick(): void {}
}