import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../shared/models/employee';
import { Product } from '../../shared/models/product/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

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
    'ProductId',
    'Name',
    'Price',
    'Category',
    'Description'
  ];
  columnToProperty = {
    'ProductId': 'productId',
    'Name': 'productName',
    'Price': 'price',
    'Category': 'categoryName',
    'Description': 'description'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/product-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/product-detail', id]);
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/scm/product-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
