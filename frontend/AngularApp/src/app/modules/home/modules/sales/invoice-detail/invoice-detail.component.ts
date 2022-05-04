import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../scm/services/product.service';
import { ShippingService } from '../../scm/services/shipping.service';
import { Invoice } from '../../shared/models/invoice/invoice.model';
import { Order } from '../../shared/models/order/order.model';
import { CompanyService } from '../../system-setting/services/company.service';
import { CustomerService } from '../service/customer.service';
import { InvoiceService } from '../service/invoice.service';
import { OrderService } from '../service/order.service';
import { PriceListService } from '../service/price-list.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent {
  selectedInvoice: Invoice | undefined;
  orderList: Order[] = [];
  constructor(
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private priceListService: PriceListService,
    private customerService: CustomerService,
    private shipmentService: ShippingService,
    private companyService: CompanyService,
    private invoiceService: InvoiceService)
  {
    this.route.queryParams.subscribe((params) => {  
      if (params['invoiceId']) {
        this.getSelectedInvoice(params['invoiceId']);
      }
    })
  }

  columnName: string[] = [
    'Order Code',
    'Date',
    'Total(Inc. Tax)',
    'Status'
  ];
  columnToProperty = {
    'Order Code': 'orderCode',
    'Date': 'createdDate',
    'Total(Inc. Tax)': 'totalIncludeTax',
    'Status': 'status'
  };

  onBack() {
    this._location.back();
  }

  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],{
      queryParams: { id: id }
    });
  };

  getSelectedInvoice(invoiceId: string){
    this.invoiceService.getInvoiceById(invoiceId)
    .subscribe((res) => {
      let temp;
      temp = res
      this.selectedInvoice = {
        invoiceId: temp.data.id,
        invoiceCode: temp.data.code,
        totalTax: temp.data.totalTax,
        totalDiscount: temp.data.totalDiscount,
        total: temp.data.totalPrice,
        orderIdList: temp.data.orderIds,
        status: temp.data.invoiceStatus,
        creatorName: 'Gia Hung'
      }
      this.getListOrder(temp.data.orderIds);
    })
  }

  getListOrder(ids: string[]){
    this.orderService.getOrderByListIds(ids)
    .subscribe((res) => {
      let data;
      data = res;
      data.data = data.data.map((x) => {return x.order})
      this.orderList = data.data.map(({ id, creatorName,code, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
        return {
          'orderId': id,
          'orderCode': code,
          'createdDate': createDate,
          'customerName': customerName,
          'totalIncludeTax': totalIncludeTax,
          'status': orderStatus
        }
      })
    })
  }
  
}
