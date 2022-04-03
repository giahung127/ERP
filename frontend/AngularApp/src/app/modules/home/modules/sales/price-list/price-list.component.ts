import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PriceList } from '../../shared/models/price-list/price-list.model';
import { Product } from '../../shared/models/product/product.model';
import { AddPriceListModalComponent } from '../add-price-list-modal/add-price-list-modal.component';
import { AddProductToPriceListModalComponent } from '../add-product-to-price-list-modal/add-product-to-price-list-modal.component';
import { PriceListService } from '../service/price-list.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  priceListList: PriceList[] = [];
  constructor(
    private priceListService: PriceListService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAllPriceList();
  }

  getAllPriceList(){
    this.priceListService.getAllPriceList()
      .subscribe((res)=> {
        let data;
        data = res;
        this.priceListList = data.map(({ id, priceListCode, priceListName})=>{
          return {
            'id': id,
            'code': priceListCode,
            'name': priceListName
          }
        })
      })
  }
  productList: Product[] = [];
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

  openCreatePriceListDialog(selectedPriceListId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      priceListList: this.priceListList,
      selectedPriceListId: selectedPriceListId
    };
    const dialogRef = this.dialog.open(AddPriceListModalComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe(
          (newPriceList) => {
            if(newPriceList){
              const data = {
                price_list_name: newPriceList.priceListName,
                price_list_code: newPriceList.priceListCode,
                price_list_items: []
              }
              if(selectedPriceListId === ''){
                  this.priceListService.addNewPriceList(data)
                  .subscribe(
                    (res)=>{
                      let temp;
                      temp = res
                      this.priceListList.push(new PriceList(temp.data ,data.price_list_code, data.price_list_name))
                      this.toastr.success('New price list is successfully added');
                    },
                    (err) => {
                      this.toastr.error(err)
                    }
                  )
                } else {
                  this.toastr.success('The price list is successfully updated');
                }
              }
        });
    }
    
  onAddEmployee: () => void = () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      priceListList: this.priceListList,
    };
    const dialogRef = this.dialog.open(AddProductToPriceListModalComponent, dialogConfig);
    dialogRef
        .afterClosed()
        .subscribe(
          (newPriceList) => {
            if(newPriceList){
              const data = {
              }
                this.toastr.success('New price list is successfully added');
              }
        });
  };
}
