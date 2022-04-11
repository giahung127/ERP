import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models/customer/customer.model';
import { Shipment } from '../../shared/models/shipment/shipment.model';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss']
})
export class ShippingListComponent {

  constructor(
    private router: Router,
  ) {}
  shipmentList: Shipment[] = [];
  columnName: string[] = [
    'Shipment id',
    'Created date',
    'Order id',
    'Customer',
    'Status'
  ];
  columnToProperty = {
    'Shipment id': 'shipmentId',
    'Created date': 'createdDate',
    'Order id': 'orderId',
    'Customer': 'customerName',
    'Status' : 'status'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/shipping-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/shipping-detail', id]);
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/scm/shipping-detail', id], {
          queryParams: { shipping: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
