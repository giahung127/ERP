import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models/customer/customer.model';
import { Shipment } from '../../shared/models/shipment/shipment.model';
import { ShippingService } from '../services/shipping.service';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss']
})
export class ShippingListComponent {

  constructor(
    private router: Router,
    private shippingService: ShippingService
  ) {
    this.getShipmentList();
  }
  shipmentList: Shipment[] = [];
  columnName: string[] = [
    'Shipment id',
    // 'Created date',
    'Order id',
    // 'Customer',
    'Status'
  ];
  columnToProperty = {
    'Shipment id': 'shipmentId',
    // 'Created date': 'createdDate',
    'Order id': 'orderId',
    // 'Customer': 'customerName',
    'Status' : 'status'
  };

  getShipmentList(){
    this.shippingService.getAllShipment()
    .subscribe(res => {
      let temp;
      temp = res;
      this.shipmentList = temp.map(({id, orderId, shipmentStatus, toAddress}) => {
        return {
          shipmentId: id,
          orderId: orderId,
          createdDate: new Date(),
          creatorName: 'Gia Hung',
          shippingAddress: toAddress,
          contactNumber: '0000',
          status: shipmentStatus
        }
      })
    })
  }
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/shipping-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/shipping-detail'],{
        queryParams: { shipment: id }
      }
    );
    
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/scm/shipping-detail', id], {
          queryParams: { shipping: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
