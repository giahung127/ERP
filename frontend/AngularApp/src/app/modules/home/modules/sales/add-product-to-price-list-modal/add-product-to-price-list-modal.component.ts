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
  constructor(
    private dialogRef: MatDialogRef<AddProductToPriceListModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.priceListList = data.priceListList
    if(data.selectedPriceListId !== ''){
      this.editMode = true;
      this.addPriceListForm = this.fb.group({
        priceListName: new FormControl('', Validators.required),
        priceListCode: new FormControl('')
      })
    } else{
      this.addPriceListForm = this.fb.group({
        priceListName: new FormControl('', Validators.required),
        priceListCode: new FormControl('')
      })
    }
  }

  onSave() {
      this.dialogRef.close(this.addPriceListForm.value);
  }

  onCancel() {
      this.dialogRef.close();
  }
}
