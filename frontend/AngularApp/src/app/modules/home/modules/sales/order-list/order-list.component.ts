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
    new Product('p001','My Pham 1', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p002','My Pham 2', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p003','My Pham 3', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p004','My Pham 4', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p005','My Pham 5', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p006','My Pham 6', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p007','My Pham 7', 100000, 'c001', 'My pham', 'ABC'),
    new Product('p008','My Pham 8', 100000, 'c001', 'My pham', 'ABC')
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
    this.router.navigate(['/home/scm/import-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/import-detail'],
    {
      queryParams: { id: id }
  });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
