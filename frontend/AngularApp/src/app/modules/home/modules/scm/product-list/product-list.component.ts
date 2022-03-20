import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../shared/models/employee';
import { Product } from '../../shared/models/product/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}
  productList: Product[] = [];
  columnName: string[] = [
    'ProductCode',
    'Name',
    'Price',
    'Category',
    'Description'
  ];
  columnToProperty = {
    'ProductCode': 'productCode',
    'Name': 'productName',
    'Price': 'price',
    'Category': 'categoryName',
    'Description': 'description'
  };

  ngOnInit(): void {
    this.initData()
  }

  initData(){
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name,price, category, description})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryName': category,
            'price': price,
            'description': description
          }
        })
      })
  }
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
