import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../scm/services/product.service';
import { ShippingService } from '../../scm/services/shipping.service';
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
    private invoiceService: InvoiceService) { }

  onBack() {
    this._location.back();
  }

}
