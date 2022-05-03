import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OrderService } from '../../sales/service/order.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Order } from '../../shared/models/order/order.model';
import { ShipmentStatus } from '../../shared/models/shipment/shipmentStatus.model';
import { ShippingService } from '../services/shipping.service';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.scss']
})
export class ShippingDetailComponent {
  viewModeCheck = false;
  editModeCheck = true;
  shipmentId = '';
  shipmentStatusList = Object.values(ShipmentStatus);
  shipmentForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router,
      private fb: FormBuilder,
      private orderService: OrderService,
      private shippingService: ShippingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.shipmentForm = this.fb.group({
        receiverName: new FormControl('', Validators.required),
        contactNumber: new FormControl(''),
        contactAddress: new FormControl(''),
        orderId: new FormControl(''),
        orderCode: new FormControl(''),
        customerName: new FormControl(''),
        totalPrice: new FormControl(''),
        shipmentCode: new FormControl('', Validators.required),
        createdDate: new FormControl('', Validators.required),
        creator: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      })
      if(params.shipment){
        this.getShipmentDetail(params.shipment);
        this.shipmentId = params.shipment;
      }
    });
  }

  getShipmentDetail(shipmentId: string){
    this.shippingService.getShipmentById(shipmentId)
    .subscribe(res => {
      let temp;
      temp = res;
      this.shipmentForm = this.fb.group({
        receiverName: new FormControl(temp.items.receiverName, Validators.required),
        contactNumber: new FormControl(temp.items.contactNumber),
        contactAddress: new FormControl(temp.items.contactAddress),
        orderId: new FormControl(temp.items.orderId),
        orderCode: new FormControl(),
        customerName: new FormControl(temp.items.customerName),
        totalPrice: new FormControl(temp.items.totalPrice),
        shipmentCode: new FormControl(temp.items.shipmentCode, Validators.required),
        createdDate: new FormControl(new Date(temp.items.createdDate).toDateString(), Validators.required),
        creator: new FormControl(temp.items.creatorName, Validators.required),
        status: new FormControl(temp.items.status, Validators.required)
      })
      this.getOrderById(temp.items.orderId)
    })
  }

  onBack() {
    this._location.back();
  }

  goToOrder: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],
    {
      queryParams: { id: this.shipmentForm.value.orderId }
  });
  };

  onUpdateShipment(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Update the shipment with these information",
      title: "Update shipment"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((submit) => {
        if(submit){
          const data = {
            'id': this.shipmentId,
            'receiver_name': this.shipmentForm.value.receiverName,
            'contact_number': this.shipmentForm.value.contactNumber,
            'contact_address': this.shipmentForm.value.contactAddress,
            'code': this.shipmentForm.value.shipmentCode,
            'shipment_status': this.shipmentForm.value.status
          }
          this.shippingService.updateShipmentById(data)
          .subscribe(res => {
            this.toastr.success('The shipment is successfully updated');
            this.onBack();
            if(this.shipmentForm.value.status === 'DELIVERED'){
              this.orderService.updateOrderStatus({id: this.shipmentForm.value.orderId, orderStatus: 'FINISHED'})
                .subscribe((res) => {
                  this.toastr.success('The order status is updated');
                },
                (err) => {
                  this.toastr.error(err);
                })
            }
          })}
      })
  }
  
  onCancelShipment(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Are you sure to cancel the shipment",
      title: "Cancel shipment"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((submit) => {
        if(submit){
          this.shippingService.updateShipmentStatusById({id: this.shipmentId, shipmentStatus: "CANCEL"})
            .subscribe((res) => {
              this.toastr.success('The shipment is cancelled');
              this.onBack();
            },
            (err) => {
              this.toastr.error(err);
            }
          )}
      })
  }

  getOrderById(orderId: string){
    if(this.orderService.getLocalById(orderId) === undefined){
      this.orderService.getAllOrdersList()
      .subscribe((res)=> {
        let data;
        data = res;
        const orderList: Order[] = data.map(({ id, creatorName ,code, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
          return {
            'orderId': id,
            'orderCode': code,
            'createdDate': createDate,
            'customerName': customerName,
            'status': orderStatus
          }
        })
        this.orderService.setLocalList(orderList)
        this.shipmentForm.value.orderCode = orderList.find((order) => {return order.orderId === orderId})?.orderCode
      })
    } else {
      this.shipmentForm.value.orderCode = this.orderService.getLocalById(orderId);
    }
  }
}
