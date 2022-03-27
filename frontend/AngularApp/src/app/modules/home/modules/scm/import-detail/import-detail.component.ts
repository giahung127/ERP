import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nonAccentVietnamese } from 'src/app/common/functions/ultils';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-import-detail',
  templateUrl: './import-detail.component.html',
  styleUrls: ['./import-detail.component.scss']
})
export class ImportDetailComponent {
  viewModeCheck = true;
  searchKeyword = '';
  productList: Product[] = [
  ];
  
  showProductList: Product[] = [];
  columnName: string[] = [
    'Code',
    'Name',
    'Category',
  ];
  columnToProperty = {
    'Code': 'productCode',
    'Name': 'productName',
    'Category': 'categoryName',
  };
  importProductList: ImportProduct[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { 
    this.getProductList();
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

  
  getProductList() {
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name, price, category, description})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryName': category,
            'price': price,
            'description': description
          }
        })
        this.showProductList = this.productList;
      })
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
      this.importProductList.push(new ImportProduct(this.importProductList.length +1, product.productId, product.productCode, product.productName, 1))
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
