import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Order } from '../../shared/models/order/order.model';
import { CustomerService } from '../service/customer.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  
  viewModeCheck = false;
  selectedEmployeeId = '';
  orderList: Order[] = [];
  addCustomerForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private toastr: ToastrService,
      private customerService: CustomerService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private orderService: OrderService
  ) {
      this.route.queryParams.subscribe((params) => {
        this.addCustomerForm = this.fb.group({
          customerCode: new FormControl('', Validators.required),
          customerName: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required)
        })
        if(params['employeeId']) {
          this.viewModeCheck = true;
          this.selectedEmployeeId = params['employeeId'];
          this.getCustomer(params['employeeId']);
          this.getCustomerOrder(params['employeeId']);
        }
      });
  }

  orderColumnName: string[] = [
    'Order Id',
    'Date',
    'Total',
    'Status'
  ];
  orderColumnToProperty = {
    'Order Id': 'orderId',
    'Date': 'createdDate',
    'Total': 'totalIncludeTax',
    'Status': 'status'
  };

  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],
    {
      queryParams: { id: id }
  });
  };

  getCustomer(customerId: string){
    this.customerService.getCustomerById(customerId)
    .subscribe((res) => {
      let temp;
      temp = res;
      this.addCustomerForm = this.fb.group({
        customerCode: new FormControl(temp.customer.gender, Validators.required),
        customerName: new FormControl(temp.customer.name, Validators.required),
        phone: new FormControl(temp.customer.phone, Validators.required),
        email: new FormControl(temp.customer.email, Validators.required),
        address: new FormControl(temp.customer.address, Validators.required)
      })
    })
  }

  onBack() {
      this._location.back();
  }

  getCustomerOrder(customerId: string){
    this.orderService.getOrderByCustomerId(customerId)
    .subscribe((res)=> {
      let data;
      data = res;
      if(data.data){
        this.orderList = data.data.map(({ id, creatorName, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
          return {
            'orderId': id,
            'createdDate': createDate,
            'status': orderStatus,
            'totalIncludeTax': totalIncludeTax
          }
        })
      }
    })
  }

  onSave(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Add/Update customer with these information",
      title: "Add/Update customer"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((submit) => {
        if(this.selectedEmployeeId === ''){
          const data = {
            'name': this.addCustomerForm.value.customerName,
            'gender': this.addCustomerForm.value.customerCode,
            'age': 0,
            'email': this.addCustomerForm.value.email,
            'phone': this.addCustomerForm.value.phone,
            'address': this.addCustomerForm.value.address
          }
          this.customerService.createNewCustomer(data)
          .subscribe(res => {
            this.toastr.success('New customer is successfully added');
            this.onBack();
          })
        } else {
          const data = {
            'id' : this.selectedEmployeeId,
            'name': this.addCustomerForm.value.customerName,
            'gender': this.addCustomerForm.value.customerCode,
            'age': 0,
            'email': this.addCustomerForm.value.email,
            'phone': this.addCustomerForm.value.phone,
            'address': this.addCustomerForm.value.address
          }
          this.customerService.updateCustomerById(data)
          .subscribe(res => {
            this.toastr.success('Information is successfully updated');
            this.onBack();
          })
        }
      })
  }
}
