import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../shared/models/category/category.model';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent {
  editMode = false;
  addCategoryForm = new FormGroup({});
  categoryList: Category[] = [];
  constructor(
    private dialogRef: MatDialogRef<AddCategoryModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.categoryList = data.categoryList
    if(data.selectedCategoryId !== ''){
      this.editMode = true;
      const tempCategory = this.categoryList.filter(x=> {return x.categoryId === data.selectedCategoryId})[0];
      this.addCategoryForm = this.fb.group({
        categoryName: new FormControl(tempCategory.categoryName, Validators.required),
        code: new FormControl(tempCategory.code, Validators.required),
        parentCategory: new FormControl(tempCategory.parentId)
      })
    } else{
      this.addCategoryForm = this.fb.group({
        categoryName: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        parentCategory: new FormControl('')
      })
    }
  }

  onSave() {
      this.dialogRef.close(this.addCategoryForm.value);
  }

  onCancel() {
      this.dialogRef.close();
  }
}
