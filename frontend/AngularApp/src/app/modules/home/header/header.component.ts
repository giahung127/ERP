import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../users/service/user.service';
import { EmployeeService } from '../modules/hrm/services/employee.service';
import { Employee } from '../modules/shared/models/employee';
import { AccountService } from '../modules/system-setting/services/account.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    currentUser: any | undefined;
    isManager = false;
    employeeList: Employee[] = []
    userName = ''
    constructor(
        private router: Router,
        private userService: UserService,
        private employeeService: EmployeeService,
        private accountService: AccountService
    ) {
        this.getCurrentUser()
    }

    async getCurrentUser(){
        this.currentUser = await this.userService.getProfile();
        this.employeeService.getEmployeeById(this.currentUser.employeeId)
        .subscribe(res => {
            let temp;
            temp = res;
            if(temp.data.role === 'Manager'){
                this.isManager = true;
            }
            console.log(temp, this.isManager)
            this.userName = temp.name
        })
    }
    logoPath = `../../../../assets/logo/HCMUT_official_logo.png`;
    
    goCompanySetting(){
        this.router.navigate(['/home/setting', 'company-setting']);
    }

    logOut(): void {
        this.userService.resetProfile();
        this.userService.logout();
        this.router.navigateByUrl('/users/login');
    }

    changePassword(): void {
        this.router.navigateByUrl('/home/setting/change-password');
    }
}
