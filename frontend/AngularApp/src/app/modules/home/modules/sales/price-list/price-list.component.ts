import { Component, OnInit } from '@angular/core';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { Product } from '../../shared/models/product/product.model';
import { PriceListService } from '../service/price-list.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  priceListList: PriceList[] = [];
  constructor(
    private priceListService: PriceListService
  ) { }

  ngOnInit() {
    this.getAllPriceList();
  }

  getAllPriceList(){
    this.priceListService.getAllPriceList()
      .subscribe((res)=> {
      
      })
  }
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
