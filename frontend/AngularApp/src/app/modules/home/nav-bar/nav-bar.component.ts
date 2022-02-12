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
                name: 'Employee List',
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
              name: 'Item1',
              href: '/home/dashboard',
              icon: 'note_add'
          },
          {
            name: 'Item2',
            href: '/home/dashboard',
            icon: 'note_add'
          }
      ]
    },
    {
      title: 'SCM',
      content: [
          {
              name: 'Products',
              href: '/home/scm/product-list',
              icon: 'category'
          },
          {
            name: 'Item2',
            href: '/home/dashboard',
            icon: 'note_add'
          }
      ]
    }
  ];
}
