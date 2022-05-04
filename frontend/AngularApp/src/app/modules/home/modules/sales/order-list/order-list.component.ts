import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../shared/models/order/order.model';
import { Product } from '../../shared/models/product/product.model';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderList: Order[] = [];
  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getAllOrderList();
  }

  getAllOrderList(){
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
    })
  }

  productList: Product[] = [
  ];
  columnName: string[] = [
    'Order Code',
    'Date',
    'Customer',
    'Status'
  ];
  columnToProperty = {
    'Order Code': 'orderCode',
    'Date': 'createdDate',
    'Customer': 'customerName',
    'Status': 'status'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/sales/order-detail'],{
      queryParams: { id: id }
    });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
