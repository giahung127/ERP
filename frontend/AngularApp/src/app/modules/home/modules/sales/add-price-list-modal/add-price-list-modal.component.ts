import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PriceList } from '../../shared/models/price-list/price-list.model';

@Component({
  selector: 'app-add-price-list-modal',
  templateUrl: './add-price-list-modal.component.html',
  styleUrls: ['./add-price-list-modal.component.scss']
})
export class AddPriceListModalComponent {

  editMode = false;
  addPriceListForm = new FormGroup({});
  selectedPriceList
  constructor(
    private dialogRef: MatDialogRef<AddPriceListModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data.selectedPriceListId !== ''){
      this.editMode = true;
      this.selectedPriceList = data.priceListList.filter(x => {return x.id === data.selectedPriceListId})[0]

      this.addPriceListForm = this.fb.group({
        priceListName: new FormControl(this.selectedPriceList.name, Validators.required),
        priceListCode: new FormControl(this.selectedPriceList.code, Validators.required)
      })
    } else{
      this.addPriceListForm = this.fb.group({
        priceListName: new FormControl('', Validators.required),
        priceListCode: new FormControl('', Validators.required)
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
