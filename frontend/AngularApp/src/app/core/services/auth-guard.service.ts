import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from 'src/app/modules/users/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private readonly userService: UserService) {}

    canActivate(): boolean {
      if (this.userService.isLoggedIn()) {
          // logged in so return true
          return true;
      }
      this.router.navigateByUrl('/users/login');
      return false;
    }
}
