import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../home/modules/shared/confirm-dialog/confirm-dialog.component';
import { AccountService } from '../../home/modules/system-setting/services/account.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {
  changePasswordForm = new FormGroup({});
  currentUser;
  constructor(
      public formBuilder: FormBuilder,
      private dialog: MatDialog,
      private toastr: ToastrService,
      private accountService: AccountService,
      private userService: UserService,
      private router: Router, 
  ) {
    this.getEmployeeInfo();
    this.changePasswordForm = this.formBuilder.group(
        {
            oldPassword: new FormControl('', Validators.required),
            newPassword: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required)
        },
        {
            validators: this.checkConfirmPassword.bind(this)
        }
    );
  }

  checkConfirmPassword(changePasswordFormGroup: FormGroup) {
    const newPassword = changePasswordFormGroup.get('newPassword')?.value;
    const confirmPassword = changePasswordFormGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notSame: true };
  }

  async getEmployeeInfo() {
    this.currentUser = await this.userService.getProfile();
    console.log(this.currentUser)
  }
  onSave() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure to change password',
      title: 'Change Password'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    // Handle user decision passed from confirm dialog
    dialogRef
    .afterClosed()
    .subscribe((submit) => {
      if (submit) {
        const data = {
          'username':this.currentUser.username,
          'password':'abc123',
          'newPassword': this.changePasswordForm.get('newPassword')?.value
        }
        this.accountService.changePassword(data)
        .subscribe((res) => {
            let temp
            temp = res
            if(temp.code === '200'){
              this.router.navigateByUrl('/home');
              this.accountService.activateAccount(this.currentUser.id)
              this.toastr.success('The password is changed successfully');
            }
          }
      );
    }
    });
  }
}
