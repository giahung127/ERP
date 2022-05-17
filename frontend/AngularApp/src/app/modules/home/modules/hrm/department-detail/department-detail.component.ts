import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Employee } from '../../shared/models/employee';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent {
  
  viewModeCheck = false;
  editModeCheck = true;
  newEmployeeId = '';

  addDepartmentForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  columnName: string[] = [
    'EmployeeId',
    'Name',
    'Position',
    'Phone',
    'Department'
  ];
  columnToProperty = {
    'EmployeeId': 'employeeId',
    'Name': 'name',
    'Position': 'position',
    'Phone': 'phone',
    'Department': 'department'
  };
  constructor(
      private _location: Location,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {
      this.route.queryParams.subscribe((params) => {
        this.addDepartmentForm = this.fb.group({
          departmentName: new FormControl('', Validators.required),
          phone: new FormControl(''),
          email: new FormControl(''),
          address: new FormControl('')
        })
      });
  }

  onBack() {
      this._location.back();
  }

}
