import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models/customer/customer.model';
import { Employee } from '../../shared/models/employee';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent  {

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    this.getCustomerList();
  }

  getCustomerList(){
    this.customerService.getAllCustomerList()
    .subscribe((res) => {
      let data;
      data = res
      this.customerList = data.map(({ id, name, phone, address})=>{
        return {
          'customerId': id,
          'name': name,
          'phone': phone,
          'address': address
        }
      })
    })
  }

  customerList: Customer[] = [];
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
    this.router.navigate(['/home/sales/customer-detail'],{
      queryParams: { employeeId: id }
    });
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/sales/customer-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
