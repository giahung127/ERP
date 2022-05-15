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
    {
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
  ];
}
