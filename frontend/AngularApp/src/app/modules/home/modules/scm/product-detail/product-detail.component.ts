import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Category } from '../../shared/models/category/category.model';
import { Product } from '../../shared/models/product/product.model';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  categoryList: Category[] = [];
  
  viewModeCheck = false;
  editModeCheck = true;
  newProductId = '';

  addProductForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private categoryService: CategoryService,
      private productService: ProductService
  ) {
      
  }

  ngOnInit(): void {
    this.initData()
  }

  initData() {
    this.categoryService.getAllCategory()
      .subscribe((res) => {
        let data;
        data = res
        this.categoryList = data.map(({ id, name, level, parentId})=>{
          return {
            'categoryId': id,
            'categoryName': name,
            'description': '',
            'level': level,
            'parentId': parentId !== null ? parentId : ''
          }
        })
      }
    )
    this.route.queryParams.subscribe((params) => {
      if(params.id){
        this.productService.getProductById(params.id)
          .subscribe(res => {
            let data;
            data = res;
            this.addProductForm = this.fb.group({
              productCode: new FormControl(data.productCode, Validators.required),
              productName: new FormControl(data.productName, Validators.required),
              category: new FormControl(data.categoryId, Validators.required),
              price: new FormControl(data.price, Validators.required),
              description: new FormControl(data.description)
            })
          })
       
      } else {
        this.addProductForm = this.fb.group({
          productCode: new FormControl('', Validators.required),
          productName: new FormControl('', Validators.required),
          category: new FormControl('', Validators.required),
          price: new FormControl(0, Validators.required),
          description: new FormControl('')
        })
      }
    });
  }

  onBack() {
      this._location.back();
  }

}
