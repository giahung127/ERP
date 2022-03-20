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
