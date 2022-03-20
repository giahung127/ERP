import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor() { }


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
    },
    {
        title: 'HRM',
        content: [
            {
                name: 'Employee',
                href: '/home/hrm/employee-list',
                icon: 'groups'
            },
            {
              name: 'Department',
              href: '/home/hrm/department-list',
              icon: 'apartment'
            }
        ]
    },
    {
      title: 'Sales',
      content: [
          {
              name: 'Order',
              href: '/home/sales/order-list',
              icon: 'list_alt'
          },
          {
            name: 'Invoces',
            href: '/home/dashboard',
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
    {
      title: 'SCM',
      content: [
          {
              name: 'Overview',
              href: '/home/dashboard',
              icon: 'visibility'
          },
          {
              name: 'Products',
              href: '/home/scm/product-list',
              icon: 'category'
          },
          {
              name: 'Import',
              href: '/home/scm/import-list',
              icon: 'input'
          },
          {
            name: 'Shipment',
            href: '/home/dashboard',
            icon: 'local_shipping'
          }
      ]
    }
  ];
}
