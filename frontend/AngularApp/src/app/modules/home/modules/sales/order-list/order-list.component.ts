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
      this.orderList = data.map(({ id, creatorName, priceListId , totalIncludeTax, totalExcludeTax, createDate, orderStatus, customerName})=>{
        return {
          'orderId': id,
          'createdDate': createDate,
          'customer': customerName,
          'status': orderStatus
        }
      })
    })
  }

  productList: Product[] = [
  ];
  columnName: string[] = [
    'Order Id',
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
