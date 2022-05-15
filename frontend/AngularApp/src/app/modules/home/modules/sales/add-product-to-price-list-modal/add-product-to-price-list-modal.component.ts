import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriceList } from '../../shared/models/price-list/price-list.model';

@Component({
  selector: 'app-add-product-to-price-list-modal',
  templateUrl: './add-product-to-price-list-modal.component.html',
  styleUrls: ['./add-product-to-price-list-modal.component.scss']
})
export class AddProductToPriceListModalComponent {

  editMode = false;
  addPriceListForm = new FormGroup({});
  priceListList: PriceList[] = [];
  productList;
  price;
  selectPriceList
  selectProduct
  constructor(
    private dialogRef: MatDialogRef<AddProductToPriceListModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.priceListList = data.priceListList
    this.productList = data.productList
    this.selectPriceList = data.currentPriceListId
  }

  onSave() {
    const data = {
      priceListId: this.selectPriceList,
      productId: this.selectProduct,
      price: this.price
    }
    this.dialogRef.close(data);
  }

  onCancel() {
      this.dialogRef.close();
  }
}
