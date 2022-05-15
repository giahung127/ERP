import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor( private router: Router, public http: HttpClient) {}


    login() {
        this.http.post('http://localhost:9001/account/login', { username: this.username, password: this.password }, { headers: this.headers })
            .subscribe(
            (res) => {
                if (res === 'ok') {
                    this.router.navigateByUrl('/home');
                }
            },
            (err: HttpErrorResponse) => {
                this.error.message = err.error['message'];
                this.error.check = true;
            },
            () => {
                // Finalize here
            }
        );
    }
    onChangeEvent() {
        this.error.check = false;
    }
    onButtonClick(): void {}
}