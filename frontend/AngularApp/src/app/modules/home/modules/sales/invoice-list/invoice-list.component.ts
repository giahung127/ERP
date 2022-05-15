import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from '../../shared/models/invoice/invoice.model';
import { Order } from '../../shared/models/order/order.model';
import { Product } from '../../shared/models/product/product.model';
import { InvoiceService } from '../service/invoice.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoiceList: Invoice[] = [];
  orderList: Order[] = []; 
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getAllOrderList();
  }

  getAllInvoiceList(){
    this.invoiceService.getAllInvoiceList()
    .subscribe((res)=> {
      let temp;
      temp = res
      this.invoiceList = temp.data.map(({id, code, invoiceStatus, orderIds,totalTax, totalDiscount, totalPrice, createdDate })=>{
        return {
          'invoiceId': id,
          'invoiceCode': code,
          'totalTax': totalTax,
          'totalDiscount': totalDiscount,
          'total': totalPrice.toLocaleString('en-US'),
          'orderIdList': orderIds,
          'createdDate': new Date(createdDate).toDateString(),
          'status': invoiceStatus,
          'creatorName': 'Gia Hung',
          'customerName': this.orderList.find(order => {return order.orderId === orderIds[0]})?.customerName,
        }
      })
    })
  }
  columnName: string[] = [
    'Invoice Code',
    'Customer',
    'Total',
    'Date',
    'Status'
  ];
  columnToProperty = {
    'Invoice Code': 'invoiceCode',
    'Date': 'createdDate',
    'Total': 'total',
    'Customer': 'customerName',
    'Status': 'status'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/invoice-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/invoice-detail'],
    {
      queryParams: { invoiceId: id }
    });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };

  getAllOrderList(){
    if(this.orderService.getLocalList() === undefined){
      this.orderService.getAllOrdersList()
      .subscribe((res)=> {
        let data;
        data = res;
        this.orderList = data.map(({ id, creatorName,code, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
          return {
            'orderId': id,
            'orderCode': code,
            'createdDate': createDate,
            'customerName': customerName,
            'status': orderStatus
          }
        })
        this.getAllInvoiceList();
      })
    } else {
      this.orderList = <Order[]>this.orderService.getLocalList()
      this.getAllInvoiceList();
    }
  }

}
