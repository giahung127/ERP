import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  
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
