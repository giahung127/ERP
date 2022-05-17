import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/modules/users/service/user.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Department } from '../../shared/models/department/department.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  departmentList: Department[] = [];
  selectedEmployeeId = ''
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
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private employeeService: EmployeeService,
      private userService: UserService
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
        if(params['employeeId']) {
          this.viewModeCheck = true;
          this.selectedEmployeeId = params['employeeId'];
          this.getEmployeeById(params['employeeId']);
        }
      });
  }

  getEmployeeById(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId)
    .subscribe((res) => {
      let temp;
      temp = res;
      this.addEmployeeForm = this.fb.group({
        fullName: new FormControl(temp.data.name, Validators.required),
        sex: new FormControl(temp.data.sex),
        role: new FormControl(temp.data.role, Validators.required),
        joinDate: new FormControl(temp.data.join_date, Validators.required),
        birthday: new FormControl(temp.data.birthday, Validators.required),
        address: new FormControl(temp.data.contact_address, Validators.required),
        phone: new FormControl(temp.data.phone, Validators.required),
        email: new FormControl(temp.data.company_email, Validators.required)
      })
    })
  }


  onBack() {
    this._location.back();
  }

  // changeForm() {
  //     this.editModeCheck = !this.editModeCheck;
  // }

  onCreate() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          message: `Are you sure to create a new employee`,
          title: 'Create new Employee'
      };
      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
      // Handle user decision passed from confirm dialog
      dialogRef
    .afterClosed()
    .subscribe((submit) => {
      if (submit) {
        if (this.selectedEmployeeId === '') {
          const data = {
            'name': this.addEmployeeForm.value.fullName,
            'sex': this.addEmployeeForm.value.sex,
            'join_date': this.addEmployeeForm.value.joinDate,
            'birthday': this.addEmployeeForm.value.birthday,                      
            'role': this.addEmployeeForm.value.role,
            'contact_address': this.addEmployeeForm.value.address,
            'phone': this.addEmployeeForm.value.phone,
            'company_email': this.addEmployeeForm.value.email
          }
          this.employeeService.createNewEmployee(data).subscribe(
              (result) => {
                  this.toastr.success('New employee is added successfully ');
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (err: HttpErrorResponse) => {
                      this.toastr.error(err.error.message);
              }
          );
          this._location.back();
        }
        else {
          const data = {
            'name': this.addEmployeeForm.value.fullName,
            'sex': this.addEmployeeForm.value.sex,
            'join_date': this.addEmployeeForm.value.joinDate,
            'birthday': this.addEmployeeForm.value.birthday,                      
            'role': this.addEmployeeForm.value.role,
            'contact_address': this.addEmployeeForm.value.address,
            'phone': this.addEmployeeForm.value.phone,
            'company_email': this.addEmployeeForm.value.email
          }
          this.employeeService.updateEmployee(data, this.selectedEmployeeId).subscribe(
              (result) => {
                  this.toastr.success('The employee is updated successfully');
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (err: HttpErrorResponse) => {
                this.toastr.error(err.error.message);
              },
              () => {}
          );
          this.userService.resetProfile();
          this._location.back();
        }
      }
    });
  }
}
