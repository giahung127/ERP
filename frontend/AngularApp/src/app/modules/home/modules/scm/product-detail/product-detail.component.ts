import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
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
      private productService: ProductService,
      private toastr: ToastrService,
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
      this.addProductForm = this.fb.group({
        productCode: new FormControl('', Validators.required),
        productName: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        description: new FormControl('')
      })
      if(params.productId){
        
        this.productService.getProductById(params.productId)
          .subscribe(res => {
            let data;
            data = res;
            console.log(res)
            this.addProductForm = this.fb.group({
              productCode: new FormControl(data.code, Validators.required),
              productName: new FormControl(data.name, Validators.required),
              category: new FormControl(data.category_id, Validators.required),
              price: new FormControl(data.price, Validators.required),
              description: new FormControl(data.description)
            })
          })
       
      }
    });
  }

  onBack() {
      this._location.back();
  }

  onSave(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Add a new product with these information",
      title: "Add new product"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
            .afterClosed()
            .subscribe((submit) => {
                if (submit) {
                  const data = {
                    code: this.addProductForm.value.productCode,
                    name: this.addProductForm.value.productName,
                    category_id: this.addProductForm.value.category,
                    price: this.addProductForm.value.price,
                    description:this.addProductForm.value.description
                  }
                  this.productService.addNewProduct(data)
                    .subscribe((res) => {
                      this.toastr.success('New product is successfully added');
                      this.onBack()
                    })
                }
            });
  }
}
