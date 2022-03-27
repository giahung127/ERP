import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product/product.model';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent {

  constructor() { }

  productList: Product[] = [
  ];
  columnName: string[] = [
    'Code',
    'Product',
    'Price'
  ];
  columnToProperty = {
    'Code': 'productCode',
    'Product': 'productName',
    'Price': 'price'
  };
  formFieldList = {
    'Price': 'price'
  };

}
