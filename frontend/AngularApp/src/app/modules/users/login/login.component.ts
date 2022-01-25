import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username = '';
    password = '';
    error = { check: false, message: '' };

    constructor( private router: Router) {}

    ngOnInit() {
        // if (this.authService.isLoggedIn()) {
        //     this.router.navigateByUrl('/home');
        // }
    }

    login() {
        this.router.navigateByUrl('/home');
        // this.authService.login(this.username, this.password).subscribe(
        //     (res) => {
        //         if (res.expiresIn && res.accessToken) {
        //             this.authService.setSession(res);
        //             this.router.navigateByUrl('/home');
        //         }
        //     },
        //     (err: HttpErrorResponse) => {
        //         this.error.message = err.error['message'];
        //         this.error.check = true;
        //         this.authService.logout();
        //     },
        //     () => {
        //         // Finalize here
        //     }
        // );
    }
    onChangeEvent() {
        this.error.check = false;
    }
    onButtonClick(): void {}
}
