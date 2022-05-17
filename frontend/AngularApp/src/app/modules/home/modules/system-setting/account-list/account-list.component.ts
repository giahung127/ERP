import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../hrm/services/employee.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Account } from '../../shared/models/account/account.model';
import { Employee } from '../../shared/models/employee';
import { AccountList } from '../../shared/models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent  {
  accountList: Account[] = []
  pendingAccountList: Account[] = []
  activateAccountList: Account[] = []
  deactivateAccountList: Account[] = []
  employeeList: Employee[] = []
  constructor(
    private accountService: AccountService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ){
    this.getListEmployee();
  }

  columnName: string[] = [
    'Code',
    'Name',
    'Username',
    'Status'
  ];
  columnToProperty = {
    'Code': 'employeeCode',
    'Name': 'employeeName',
    'Username': 'username',
    'Status': 'status'
  };

  customActionsActivated = [
    {
        display: 'Activated',
        action: (item: any) => {
            this.openActivatedDialog(item);
        }
    }
  ];

  customActionsDeactivated = [
    {
        display: 'Deactivated',
        action: (item: any) => {
            this.openDeactivatedDialog(item);
        }
    }
  ];
  getAllAccount(){
    this.accountService.getAllAccount()
    .subscribe((res) => {
      let temp;
      temp = res;
      this.accountList = temp.map(({id, employeeId, username, accountStatus})=> {
        return {
          'accountId': id,
          'username': username,
          'employeeId': employeeId,
          'status': accountStatus,
          'employeeName': this.employeeList.find((x)=> {return x.employeeId === employeeId})?.name,
          'employeeCode': this.employeeList.find((x)=> {return x.employeeId === employeeId})?.code
        }
      })
      this.pendingAccountList = this.accountList.filter(x => {return x.status === 'PENDING'});
      this.activateAccountList = this.accountList.filter(x => {return x.status === 'ACTIVATE'});
      this.deactivateAccountList = this.accountList.filter(x => {return x.status === 'DEACTIVATE'});
    })
  }

  getListEmployee(){
    let data;
    this.employeeService.getAllEmployee().subscribe(res => {
      data = res
      this.employeeList = data.data.map(({ id, code, name, role, phone})=>{
        return {
          'employeeId': id,
          'code': code,
          'name': name,
          'role': role,
          'phone': phone,
        }
      })
      this.getAllAccount()
    })
  }

  openDeactivatedDialog(account: Account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        message: 'Deactivate this account ',
        title: 'Deactivation'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    // Handle user decision passed from confirm dialog
    dialogRef
    .afterClosed()
    .subscribe((del) => {
        if (del) {
          this.accountService.deactivateAccount(account.accountId)
          .subscribe(
            (result) => {
              this.toastr.success('This account is deactivated');
              this.getAllAccount()
            },
            
            (err: HttpErrorResponse) => {
              this.toastr.error(err.error.message);
            }
          );
        }
    });
  }

  openActivatedDialog(account: Account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        message: 'Activate this account ',
        title: 'Activation'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    // Handle user decision passed from confirm dialog
    dialogRef
    .afterClosed()
    .subscribe((del) => {
        if (del) {
          this.accountService.activateAccount(account.accountId)
          .subscribe(
            (result) => {
              this.toastr.success('This account is activated');
              this.getAllAccount()
            },
            
            (err: HttpErrorResponse) => {
              this.toastr.error(err.error.message);
            }
          );
        }
    });
  }
}
