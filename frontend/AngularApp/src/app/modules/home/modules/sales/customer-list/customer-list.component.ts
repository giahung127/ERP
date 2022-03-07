import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models/customer/customer.model';
import { Employee } from '../../shared/models/employee';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent  {


  constructor(
    private router: Router,
  ) {}
  customerList: Customer[] = [
    new Customer('c001','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
    new Customer('c002','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
    new Customer('c003','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
    new Customer('c004','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
    new Customer('c005','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
    new Customer('c006','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
    new Customer('c007','Nguyen Van A', '012346789', 'Software Enginering', 'Intership')
  ];
  columnName: string[] = [
    'Customer Id',
    'Name',
    'Phone',
    'Address'
  ];
  columnToProperty = {
    'Customer Id': 'customerId',
    'Name': 'name',
    'Phone': 'phone',
    'Address': 'address'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/customer-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/customer-detail', id]);
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/sales/customer-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
