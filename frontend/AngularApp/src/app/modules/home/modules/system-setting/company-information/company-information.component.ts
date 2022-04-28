import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Company } from '../../shared/models/company/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss']
})
export class CompanyInformationComponent implements OnInit {
  company
  editInformationForm = new FormGroup({});
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.getCompanyInfo();
  }


  getCompanyInfo() {
    this.companyService
      .getCompanyInfo()
      .subscribe((res) => {
        if(res){
          console.log(res)
          let temp
          temp = res
          this.company = new Company(temp.id, temp.companyName, temp.companyAddress, temp.contactName, temp.contactEmail, temp.contactPhone ,temp.contactAddress)
      
        } else {
          this.company = new Company('', '', '','','','','');
        }
        this.createEditForm();
      });
  }

  createEditForm() {
      // const info = this.company;
      this.editInformationForm = this.formBuilder.group({
          name: new FormControl(this.company.name , Validators.required),
          address: new FormControl(this.company.address, Validators.required),
          contactName: new FormControl(this.company.contactName),
          contactMail: new FormControl(this.company.contactMail),
          contactPhone: new FormControl(this.company.contactPhone),
          contactAddress: new FormControl(this.company.contactAddress)
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
              if (submit) {
                const data = {
                  id: this.company.id,
                  company_name: this.editInformationForm.value.name,
                  company_address:this.editInformationForm.value.address,
                  contact_name: this.editInformationForm.value.contactName,
                  contact_email: this.editInformationForm.value.contactEmail,
                  contact_phone: this.editInformationForm.value.contactPhone,
                  contact_address: this.editInformationForm.value.contactAddress
                }
                this.companyService
                    .updateCompanyInfo(data)
                    .subscribe(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        (result) => {
                            this.toastr.success('Company Information is updated');
                        },
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        (err: HttpErrorResponse) => {
                            this.toastr.error(err.error);
                        }
                    );
              }
          });
  }
}
