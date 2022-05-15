import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PriceListService } from '../../sales/service/price-list.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Category } from '../../shared/models/category/category.model';
import { Import } from '../../shared/models/import/import.model';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { ImportProduct } from '../../shared/models/product/import-product.model';
import { Product } from '../../shared/models/product/product.model';
import { Supplier } from '../../shared/models/supplier/shipment.model';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { SupplementService } from '../services/supplement.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productList: Product[] = [];
  categoryList: Category[] = [];
  supplementList: Import[] = [];
  supplierList: Supplier[] = [];
  importItemList: ImportProduct[] = [];
  viewModeCheck = false;
  editModeCheck = true;
  newProductId = '';
  selectedProductId = '';
  priceListList: PriceList[] = [];
  addProductForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  showColumnName: string[] = []
  showColumnToProperty = {}
  productColumnName: string[] = [
    'Supplement Code',
    'Date',
    'Supplier',
    'Amount',
    'Remaining'
  ];
  productColumnToProperty = {
    'Supplement Code': 'supplementCode',
    'Date': 'createdDate',
    'Supplier': 'supplierName',
    'Amount': 'amount',
    'Remaining': 'remaining'
  };
  expireProductColumnName: string[] = [
    'Supplement Code',
    'Date',
    'Supplier',
    'Amount',
    'Remaining',
    'Man. Date',
    'Exp. Date'
  ];
  expireProductColumnToProperty = {
    'Supplement Code': 'supplementCode',
    'Date': 'createdDate',
    'Supplier': 'supplierName',
    'Amount': 'amount',
    'Remaining': 'remaining',
    'Man. Date':'manufacturedDate',
    'Exp. Date' : 'expiryDate',
  };
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private categoryService: CategoryService,
      private productService: ProductService,
      private supplierService: SupplierService,
      private toastr: ToastrService,
      private supplementService: SupplementService,
      private priceListService: PriceListService
  ) {
    this.getAllProduct()
    this.getAllPriceList()
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
        this.getAllSupplement();
        this.getSupplierList();
      }
    )
    this.route.queryParams.subscribe((params) => {
      this.addProductForm = this.fb.group({
        productCode: new FormControl(''),
        productName: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        description: new FormControl(''),
        isExpire: new FormControl(false, Validators.required),
      })
      if(params.productId){
        this.selectedProductId = params.productId
        
        
        this.productService.getProductById(params.productId)
          .subscribe(res => {
            let data;
            data = res;
            this.addProductForm = this.fb.group({
              productCode: new FormControl(data.code),
              productName: new FormControl(data.name, Validators.required),
              category: new FormControl(data.category_id, Validators.required),
              price: new FormControl(data.price, Validators.required),
              description: new FormControl(data.description),
              isExpire: new FormControl(data.is_expire)
            })
          })
      }
    });
  }
  getAllPriceList(){
    this.priceListService.getAllPriceList()
      .subscribe((res)=> {
        let data;
        data = res;
        data = data.map(x => {return x.data});
        this.priceListList = data.map(({ price_list_id, price_list_code, price_list_name, price_list_items})=>{
          return {
            'id': price_list_id,
            'code': price_list_code,
            'name': price_list_name,
            'item': price_list_items !== null ? price_list_items: []
          }
        })
      })
  }
  getAllProduct(){
    this.productService.getAllProduct()
      .subscribe(res => {
        let data;
        data = res;
        this.productList = data.map(({ id, code, name,price, categoryName, description, category_id, amount, is_expire})=>{
          return {
            'productId': id,
            'productCode': code,
            'productName': name,
            'categoryId': category_id,
            'categoryName': categoryName,
            'price': price,
            'description': description,
            'amount': amount,
            'isExpire': is_expire
          }
        })
        const isExpire = this.productList.find(x => {return x.productId === this.selectedProductId})?.isExpire;
        if(isExpire){
          this.showColumnName = this.expireProductColumnName
          this.showColumnToProperty = this.expireProductColumnToProperty
        } else {
          this.showColumnName = this.productColumnName
          this.showColumnToProperty = this.productColumnToProperty
        }
      })
  }

  getSupplementList(productId: string){
    this.supplementService.getSupplementItemByProductId(productId)
    .subscribe((res) => {
      let temp;
      temp = res;
      if(temp.data){
        this.importItemList = temp.data.map(({amount, expiryDate, manufacturedDate, price, productId, remaining, supplementId}) => {
          const supplierId = this.supplementList.find(x => {return x.importId === supplementId})?.supplierId
          return{
            amount: amount,
            expiryDate: new Date(expiryDate).toDateString(),
            manufacturedDate: new Date(manufacturedDate).toDateString(),
            price: price,
            productId: productId,
            remaining: remaining,
            supplementId: supplementId,
            supplementCode: this.supplementList.find(x => {return x.importId === supplementId})?.importCode,
            createdDate: this.supplementList.find(x => {return x.importId === supplementId})?.createdDate,
            supplierName: this.supplierList.find(x => {return x.supplierId === supplierId})?.name
          }
        })
      }
    })
  }

  onBack() {
      this._location.back();
  }

  getAllSupplement(){
    this.supplementService.getAllSupplement()
    .subscribe((res) => {
      let temp;
      temp = res
      temp.data = temp.data.map(x => {return x.supplement})
      
      this.supplementList = temp.data.map(({id, code, createdBy, date, supplierId, total}) => {
        return {
          importId: id,
          importCode: code,
          createdBy: createdBy,
          createdDate: new Date(date).toDateString(),
          supplierId: supplierId,
          supplierName: this.supplierList.find(x => {return x.supplierId === supplierId})?.name,
          total: total
        }
      })
      this.getSupplementList(this.selectedProductId) 
    })
  }

  getSupplierList(){
    this.supplierService.getAllSupplier()
    .subscribe((res) => {
      let temp;
      temp = res;
      this.supplierList = temp.suppliers.map(({id, name,code, address, phone, email}) => {
        return {
          'supplierId': id,
          'name': name,
          'address': address,
          'phone': phone,
          'email': email,
          'code': code
        }
      })
    })
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
          if(this.selectedProductId === ''){
          const data = {
            code: this.addProductForm.value.productCode,
            name: this.addProductForm.value.productName,
            category_id: this.addProductForm.value.category,
            price: this.addProductForm.value.price,
            description:this.addProductForm.value.description,
            is_expire: this.addProductForm.value.isExpire
          }
          this.productService.addNewProduct(data)
            .subscribe((res) => {
                let temp;
                temp = res;
                const data = {
                  priceListId: this.priceListList.find(x => {return x.name === 'Default'})?.id,
                  productId: temp.data,
                  price: this.addProductForm.value.price
                }
                this.priceListService.addProductToPriceList(data)
                  .subscribe(res => {
                    this.toastr.success('Successfully added to Default Price List');
                  },
                  (err) => {
                    this.toastr.error(err);
                  })
              this.toastr.success('New product is successfully added');
              this.onBack()
            })
          } else {
            const data = {
              id: this.selectedProductId,
              code: this.addProductForm.value.productCode,
              name: this.addProductForm.value.productName,
              category_id: this.addProductForm.value.category,
              price: this.addProductForm.value.price,
              description:this.addProductForm.value.description,
              is_expire: this.addProductForm.value.isExpire
            }
            this.productService.updateProductById(data)
              .subscribe((res) => {
                
                this.toastr.success('The product is successfully updated');
                this.onBack()
              })

          }
        }
    });
  }
  
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    console.log(id)
    this.router.navigate(['/home/scm/supplement-detail'],
    {
      queryParams: { supplementId: id }
    });
  };
}
