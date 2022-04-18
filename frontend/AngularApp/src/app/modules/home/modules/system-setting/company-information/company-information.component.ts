import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {

  editInformationForm = new FormGroup({});
  constructor(
      private toastr: ToastrService,
      private formBuilder: FormBuilder,
      private dialog: MatDialog
  ) {}

  ngOnInit() {
      // this.getCompanyInfo();
      this.createEditForm();
  }


  // getCompanyInfo() {
  //     this.companyService
  //         .initCompanyData()
  //         .pipe(takeUntil(this.destroy$))
  //         .subscribe((res) => {
  //             this.company = res;
  //             this.createEditForm();
  //         });
  // }
  createEditForm() {
      // const info = this.company;
      this.editInformationForm = this.formBuilder.group({
          name: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          contactName: new FormControl(''),
          contactMail: new FormControl(''),
          contactPhone: new FormControl(''),
          contactAddress: new FormControl('')
      });
  }

  updateCompanyInfo() {
      // Open confirm dialog
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          message: 'Are you sure ?',
          title: 'Update Company Information'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

      // console.log(this.createEmployeeForm.value);
      // const valueForm = this.editInformationForm.value;
      // valueForm.ownerId = this.company.ownerId;
      // valueForm.companyCode = this.company.companyCode;
      dialogRef
          .afterClosed()
          .subscribe((submit) => {
              // if (submit) {
              //     this.companyService
              //         .updateCompany(this.company.companyId, valueForm)
              //         .pipe(takeUntil(this.destroy$))
              //         .subscribe(
              //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
              //             (result) => {
              //                 this.toastr.success(this.translate.instant('EMPLOYEE_INFORMATION.COMPLETELY_SAVED'));
              //             },
              //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
              //             (err: HttpErrorResponse) => {
              //                 this.toastr.error(`ERROR.LR_UNKNOWN_VALIDATION_ERROR`);
              //             }
              //         );
              // }
          });
  }
}
