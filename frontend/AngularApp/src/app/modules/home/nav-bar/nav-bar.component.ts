import { Component } from '@angular/core';
import { UserService } from '../../users/service/user.service';
import { EmployeeService } from '../modules/hrm/services/employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentUser
  showNavBar? :{
    title: string;
    content: {
        name: string;
        href: string;
        icon: string;
    }[];
  }[] = [];
  constructor(
    private userService: UserService,
    private employeeService: EmployeeService
  ) {
    this.getEmployeeInfo();
  }

  saleEmployees = [
    {
      title: 'Sales',
      content: [
          {
              name: 'Order',
              href: '/home/sales/order-list',
              icon: 'list_alt'
          },
          {
            name: 'Invoices',
            href: '/home/sales/invoice-list',
            icon: 'receipt'
          },
          {
            name: 'Customers',
            href: '/home/sales/customer-list',
            icon: 'supervisor_account'
          },
          {
            name: 'Price List',
            href: '/home/sales/price-list',
            icon: 'request_quote'
          },
      ]
    },
  ]

  scmEmployee = [{
    title: 'SCM',
    content: [
        // {
        //     name: 'Overview',
        //     href: '/home/dashboard',
        //     icon: 'visibility'
        // },
        {
            name: 'Products',
            href: '/home/scm/product-list',
            icon: 'category'
        },
        {
            name: 'Supplement',
            href: '/home/scm/supplement-list',
            icon: 'input'
        },
        {
          name: 'Shipment',
          href: '/home/scm/shipping-list',
          icon: 'local_shipping'
        },
        {
          name: 'Supplier',
          href: '/home/scm/supplier-list',
          icon: 'inventory_2'
        }
    ]
    }
  ]

  manager = [
    {
        title: 'HRM',
        content: [
            {
                name: 'Employee',
                href: '/home/hrm/employee-list',
                icon: 'groups'
            }
        ]
    }
  ]
  data = [
    {
        title: 'Home',
        content: [
            {
                name: 'Dashboard',
                href: '/home/dashboard',
                icon: 'dashboard'
            },
            {
                name: 'Profile',
                href: `/home/dashboard`,
                icon: 'perm_identity'
            }
        ]
    }
  ];
  

  async getEmployeeInfo() {
    this.currentUser = await this.userService.getProfile();
    this.employeeService.getEmployeeById(this.currentUser.employeeId)
    .subscribe(res => {
      let temp;
      temp = res;
      
      if(temp.data.role === 'Sale Employee'){
      this.showNavBar = [...this.data,...this.saleEmployees]
      }
      if(temp.data.role === 'SCM Employee'){
        this.showNavBar = [...this.data,...this.scmEmployee]
      }
      if(temp.data.role  === 'Manager'){
        this.showNavBar = [...this.data,...this.manager,...this.saleEmployees,...this.scmEmployee]
      }

    })
    
  }
}
