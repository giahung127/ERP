import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Invoice } from '../../shared/models/invoice/invoice.model';
import { Order } from '../../shared/models/order/order.model';
import { TableListService } from '../../shared/services/table-list.service';
import { CustomerService } from '../service/customer.service';
import { InvoiceService } from '../service/invoice.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  
  viewModeCheck = false;
  selectedCustomerId = '';
  orderList: Order[] = [];
  uninvoiceOrderList: Order[] = [];
  invoiceId: string[] = [];
  invoiceList: Invoice[] = [];
  addCustomerForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  invoiceTotal = 0;
  totalPrice = 0;
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private toastr: ToastrService,
      private customerService: CustomerService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private orderService: OrderService,
      private invoiceService: InvoiceService,
      private tableListService: TableListService
  ) {
      this.route.queryParams.subscribe((params) => {
        this.addCustomerForm = this.fb.group({
          customerCode: new FormControl('', Validators.required),
          customerName: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required)
        })
        if(params['customerId']) {
          this.viewModeCheck = true;
          this.selectedCustomerId = params['customerId'];
          this.getCustomer(params['customerId']);
          this.getCustomerOrder(params['customerId']);
        }
      });
  }

  orderColumnName: string[] = [
    'Order code',
    'Date',
    'Total',
    'Status'
  ];
  orderColumnToProperty = {
    'Order code': 'orderCode',
    'Date': 'createdDate',
    'Total': 'totalIncludeTax',
    'Status': 'status'
  };

  invoiceColumnName: string[] = [
    'Invoice Code',
    'Total',
    'Date',
    'Status'
  ];
  invoiceColumnToProperty = {
    'Invoice Code': 'invoiceCode',
    'Date': 'createdDate',
    'Total': 'total',
    'Status': 'status'
  };

  onOrderViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],
    {
      queryParams: { id: id }
  });
  };

  onInvoiceViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/invoice-detail'],
    {
      queryParams: { invoiceId: id }
    });
  };

  getCustomer(customerId: string){
    this.customerService.getCustomerById(customerId)
    .subscribe((res) => {
      let temp;
      temp = res;
      this.addCustomerForm = this.fb.group({
        customerCode: new FormControl(temp.customer.code, Validators.required),
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
        data.data = data.data.map(data => {return data.order})
        this.orderList = data.data.map(({ id,invoiceId, creatorName,code, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
          if(invoiceId !== null && this.invoiceId.indexOf(invoiceId) === -1){
            this.invoiceId.push(invoiceId)
          }
          return {
            'orderId': id,
            'orderCode': code,
            'createdDate': createDate,
            'totalIncludeTax': totalIncludeTax.toLocaleString('en-US'),
            'invoiceId': invoiceId,
            'status': orderStatus
          }
        })
        this.getListInvoiceByIds(this.invoiceId);
        this.uninvoiceOrderList = this.orderList.filter((order) => {return order.invoiceId === null && order.status !== 'CANCEL'})
      }
    })
  }

  getListInvoiceByIds(ids: string[]){
    this.invoiceService.getInvoiceByListIds(ids)
    .subscribe((res)=> {
      let temp;
      temp = res
      this.invoiceList = temp.data.map(({id, code, invoiceStatus, orderIds,totalTax, totalDiscount, totalPrice })=>{
        if(invoiceStatus === 'UNPAID'){
          this.invoiceTotal += totalPrice;
        }
        this.totalPrice += totalPrice
        return {
          'invoiceId': id,
          'invoiceCode': code,
          'totalTax': totalTax,
          'totalDiscount': totalDiscount,
          'total': totalPrice.toLocaleString('en-US'),
          'orderIdList': orderIds,
          'createdDate': new Date().toDateString(),
          'status': invoiceStatus,
          'creatorName': 'Gia Hung',
          'customerName': this.orderList.find(order => {return order.orderId === orderIds[0]})?.customerName,
        }
      })
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
        if(submit){
          if(this.selectedCustomerId === ''){
            const data = {
              'name': this.addCustomerForm.value.customerName,
              'code': this.addCustomerForm.value.customerCode,
              'gender': '',
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
              'id' : this.selectedCustomerId,
              'name': this.addCustomerForm.value.customerName,
              'code': this.addCustomerForm.value.customerCode,
              'gender': '',
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
        }
      })
  }

  createInvoice(){
    console.log(this.tableListService.getSelectedRows())
    const listIds = this.tableListService.getSelectedRows().map((row) => {return row.orderId})
    if(listIds.length === 0){
      this.toastr.warning('There is no selected order !!!')
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        message: "Create a new invoice for these order",
        title: "Create a new invoice"
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      dialogRef.afterClosed()
      .subscribe((submit) => {
        if (submit) {
          const data = {
            'orderIdList': listIds
          }
          this.invoiceService.createNewInvoice(data)
          .subscribe(
            (res) => {
              this.toastr.success('The new invoice is created');
              this.getCustomerOrder(this.selectedCustomerId);
            },
            (error) => {
              this.toastr.success(error.message);
            }
          )
        }
      });
    }
  }
}
