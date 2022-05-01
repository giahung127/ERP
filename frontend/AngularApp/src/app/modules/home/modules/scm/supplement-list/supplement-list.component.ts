import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/models/product/product.model';

@Component({
  selector: 'app-supplement-list',
  templateUrl: './supplement-list.component.html',
  styleUrls: ['./supplement-list.component.scss']
})
export class SupplementListComponent {

  constructor(
    private router: Router,
  ) {}
  productList: Product[] = [];
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
    this.router.navigate(['/home/scm/supplement-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/scm/supplement-detail'],
    {
      queryParams: { id: id }
  });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
