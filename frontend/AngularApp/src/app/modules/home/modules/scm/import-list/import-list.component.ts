import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product/product.model';

@Component({
  selector: 'app-import-list',
  templateUrl: './import-list.component.html',
  styleUrls: ['./import-list.component.scss']
})
export class ImportListComponent {

  constructor(
    private router: Router,
  ) {}
  productList: Product[] = [
    new Product('i001','Don nhap 1', 100000, 'Finish', 'Dai ly A', 'ABC'),
    new Product('i002','Don nhap 2', 100000, 'Processing', 'Dai ly A', 'ABC'),
    new Product('i003','Don nhap 3', 100000, 'Processing', 'Dai ly A', 'ABC'),
    new Product('i004','Don nhap 4', 100000, 'Processing', 'Dai ly B', 'ABC'),
    new Product('i005','Don nhap 5', 100000, 'Processing', 'Dai ly B', 'ABC'),
    new Product('i006','Don nhap 6', 100000, 'Processing', 'Dai ly A', 'ABC'),
    new Product('i007','Don nhap 7', 100000, 'Processing', 'Dai ly B', 'ABC'),
    new Product('i008','Don nhap 8', 100000, 'Processing', 'Dai ly A', 'ABC')
  ];
  columnName: string[] = [
    'ImportId',
    'Date',
    'Supplier',
    'Status'
  ];
  columnToProperty = {
    'ImportId': 'productId',
    'Date': 'productName',
    'Supplier': 'productName',
    'Status': 'categoryId'
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
