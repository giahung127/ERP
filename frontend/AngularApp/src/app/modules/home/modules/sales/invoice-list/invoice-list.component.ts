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
  constructor(
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.getAllInvoiceList();
  }

  getAllInvoiceList(){
    this.invoiceService.getAllInvoiceList()
    .subscribe((res)=> {
     
    })
  }

  productList: Product[] = [
  ];
  columnName: string[] = [
    'Invoice Code',
    'Date',
    'Customer',
    'Status'
  ];
  columnToProperty = {
    'Order Id': 'orderId',
    'Date': 'createdDate',
    'Customer': 'customer',
    'Status': 'status'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],
    {
      queryParams: { id: id }
  });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };

}
