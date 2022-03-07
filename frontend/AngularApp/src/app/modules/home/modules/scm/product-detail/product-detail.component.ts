import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Department } from '../../shared/models/department/department.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  departmentList: Department[] = [];
  
  viewModeCheck = false;
  editModeCheck = true;
  newProductId = '';

  addProductForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {
      this.route.queryParams.subscribe((params) => {
        this.addProductForm = this.fb.group({
          productCode: new FormControl('', Validators.required),
          productName: new FormControl('', Validators.required),
          category: new FormControl('', Validators.required),
          price: new FormControl(0, Validators.required),
          description: new FormControl('')
        })
      });
  }

  


  onBack() {
      this._location.back();
  }

}
