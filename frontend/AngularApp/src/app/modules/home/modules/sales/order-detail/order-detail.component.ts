import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { nonAccentVietnamese } from 'src/app/common/functions/ultils';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  viewModeCheck = true;
  searchKeyword = '';
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
  
  showProductList: Product[] = [];
  columnName: string[] = [
    'ProductId',
    'Name',
    'Category',
  ];
  columnToProperty = {
    'ProductId': 'productId',
    'Name': 'productName',
    'Category': 'categoryName',
  };
  importProductList: ImportProduct[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
  ) { 
    this.showProductList = this.productList;
    this.route.queryParams.subscribe((params) => {
      if (params['id'] && params['id'] == 'i001') {
        this.viewModeCheck = false;
      } else {
        this.viewModeCheck = true;
      }      
    })
  }

  onBack() {
    this._location.back();
  }
  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue.toLowerCase();
    const filter = nonAccentVietnamese(filterValue || '');
    this.showProductList = this.productList.filter((x) => {
        return nonAccentVietnamese(x.productName.toLowerCase() || '').indexOf(filter) !== -1;
    });
  }

  addToImport: (id: string) => void = (id: string) =>{
    const data = this.importProductList.filter(x => {return x.productId === id})[0]
    if(data){
      data.amount += 1;
    } else {
      const product = this.productList.filter(x => {return x.productId === id})[0]
      this.importProductList.push(new ImportProduct(this.importProductList.length +1, product.productId, product.productName, 1))
    }
  }

  reIndexNo() {
      for (let i = 0; i < this.importProductList.length; i++) {
          this.importProductList[i].no = i + 1;
      }
  }

  delete(item) {
    this.importProductList = this.importProductList.filter((product) => {
        return product.productId !== item;
    });
    this.reIndexNo();
}
}
