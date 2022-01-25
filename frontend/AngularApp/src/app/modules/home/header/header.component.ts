import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    currentUser: any = {
        employeeId: '',
        employeeName: '',
        bankName: '',
        bankNumber: ''
    };
    constructor(
        private router: Router
    ) {}

    logoPath = `../../../../assets/logo/HCMUT_official_logo.png`;
    

    ngOnInit(): void {
    }
}
