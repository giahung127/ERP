import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.scss']
})
export class ShippingDetailComponent {

  viewModeCheck = false;
  editModeCheck = true;
  newEmployeeId = '';

  addEmployeeForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {
      this.route.queryParams.subscribe((params) => {
        this.addEmployeeForm = this.fb.group({
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl(''),
          sex: new FormControl(''),
          departmentId: new FormControl('', Validators.required),
          positionId: new FormControl('', Validators.required),
          changeDate: new FormControl('', Validators.required),
          joinDate: new FormControl('', Validators.required),
          birthday: new FormControl('', Validators.required),
          birthPlace: new FormControl('', Validators.required),
          maritalStatus: new FormControl('', Validators.required),
          contactAddress: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          companyEmail: new FormControl('', Validators.required),
          personalEmail: new FormControl('', Validators.required),
          bankName: new FormControl('', Validators.required),
          accountNo: new FormControl('', Validators.required)
        })
      });
    }

    onBack() {
      this._location.back();
  }
}
