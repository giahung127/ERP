import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../sales/service/order.service';
import { Customer } from '../../shared/models/customer/customer.model';
import { Order } from '../../shared/models/order/order.model';
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
    private shippingService: ShippingService,
    private orderService: OrderService
  ) {
    this.getAllOrderList()
  }
  shipmentList: Shipment[] = [];
  orderList: Order[] = [];
  columnName: string[] = [
    'Code',
    'Order code',
    'Receiver',
    'Contact number',
    'Created date',
    'Status'
  ];
  columnToProperty = {
    'Code': 'shipmentCode',
    'Order code': 'orderCode',
    'Receiver': 'contactName',
    'Contact number': 'contactNumber',
    'Created date': 'createdDate',
    'Status' : 'status'
  };

  getShipmentList(){
    this.shippingService.getAllShipment()
    .subscribe(res => {
      let temp;
      temp = res;
      this.shipmentList = temp.map(({id, code, orderId, createdDate, receiverName, contactAddress, contactNumber, shipmentStatus}) => {
        return {
          shipmentId: id,
          shipmentCode: code,
          orderCode: this.orderList.find(order => {return order.orderId === orderId})?.orderCode,
          orderId: orderId,
          createdDate: new Date(createdDate).toDateString(),
          creatorName: 'Gia Hung',
          contactName: receiverName, 
          contactAddress: contactAddress,
          contactNumber: contactNumber,
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
        this.orderService.setLocalList(this.orderList);
        this.getShipmentList();
      })
    } else {
      this.orderList = <Order[]>this.orderService.getLocalList()
      this.getShipmentList();
    }
  }
}
