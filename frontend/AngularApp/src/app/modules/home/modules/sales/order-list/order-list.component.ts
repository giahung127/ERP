import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product/product.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  constructor(
    private router: Router,
  ) {}
  productList: Product[] = [
  ];
  columnName: string[] = [
    'Order Id',
    'Date',
    'Supplier',
    'Status'
  ];
  columnToProperty = {
    'Order Id': 'productId',
    'Date': 'productName',
    'Supplier': 'productName',
    'Status': 'price'
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
