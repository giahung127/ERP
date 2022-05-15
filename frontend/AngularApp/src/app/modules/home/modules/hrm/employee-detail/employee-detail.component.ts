import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Department } from '../../shared/models/department/department.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  departmentList: Department[] = [];
  
  viewModeCheck = false;
  editModeCheck = true;
  newEmployeeId = '';
  roleList = [
    'Manager',
    'Sale Employee',
    'SCM Employee'
  ]
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
          fullName: new FormControl('', Validators.required),
          sex: new FormControl(''),
          role: new FormControl('', Validators.required),
          joinDate: new FormControl('', Validators.required),
          birthday: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required)
        })
      });
  }

  


  onBack() {
      this._location.back();
  }

  // changeForm() {
  //     this.editModeCheck = !this.editModeCheck;
  // }

  // onCreate() {
  //     const newDepartment: Department = {
  //         departmentId: this.selectedDepartment.departmentId,
  //         ...this.createDepartmentForm.value
  //     };
  //     const dialogConfig = new MatDialogConfig();
  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.data = {
  //         message: `Are you sure to create a new department with these information`,
  //         title: 'Create Department'
  //     };
  //     const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
  //     // Handle user decision passed from confirm dialog
  //     dialogRef
  //         .afterClosed()
  //         .pipe(take(1))
  //         .subscribe((submit) => {
  //             if (submit) {
  //                 if (!this.viewModeCheck) {
  //                     this.departmentService.createDepartment(newDepartment).subscribe(
  //                         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //                         (result) => {
  //                             this.newDepartmentId = result;
  //                             this.toastr.success(this.translate.instant('LEAVE_REQUEST_FORM.REQUEST_SENT'));
  //                         },
  //                         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //                         (err: HttpErrorResponse) => {
  //                             let errorMessage = this.translate.instant(`ERROR.${err.error.error}`);
  //                             // Restore the form so that user can check their input
  //                             if (errorMessage) {
  //                                 errorMessage = err.error.moreInfo
  //                                     ? `${errorMessage} (${err.error.moreInfo})`
  //                                     : errorMessage;
  //                                 this.toastr.error(errorMessage);
  //                             } else {
  //                                 this.toastr.error(err.error.message);
  //                             }
  //                         },
  //                         () => {}
  //                     );
  //                     this._location.back();
  //                 }
  //                 if (this.viewModeCheck) {
  //                     this.departmentService.updateDepartment(newDepartment).subscribe(
  //                         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //                         (result) => {
  //                             this.newDepartmentId = result;
  //                             this.toastr.success(this.translate.instant('LEAVE_REQUEST_FORM.REQUEST_SENT'));
  //                         },
  //                         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //                         (err: HttpErrorResponse) => {
  //                             let errorMessage = this.translate.instant(`ERROR.${err.error.error}`);
  //                             // Restore the form so that user can check their input
  //                             if (errorMessage) {
  //                                 errorMessage = err.error.moreInfo
  //                                     ? `${errorMessage} (${err.error.moreInfo})`
  //                                     : errorMessage;
  //                                 this.toastr.error(errorMessage);
  //                             } else {
  //                                 this.toastr.error(err.error.message);
  //                             }
  //                         },
  //                         () => {}
  //                     );
  //                     this._location.back();
  //                 }
  //             }
  //         });
  // }
}
