import { Component  } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/modules/users/service/user.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup({});
  currentUser;
  oldPasswordError = { check: false, message: '' };
  constructor(
      public formBuilder: FormBuilder,
      private dialog: MatDialog,
      private toastr: ToastrService,
      private accountService: AccountService,
      private userService: UserService
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
          'password':this.changePasswordForm.get('oldPassword')?.value,
          'newPassword': this.changePasswordForm.get('newPassword')?.value
        }
        this.accountService.changePassword(data)
        .subscribe((res) => {
            let temp
            temp = res
            if(temp.code === '200'){
              this.toastr.success('The password is changed successfully');
            }
            else{
              this.oldPasswordError.check = true;
              this.oldPasswordError.message = temp.message
            }
          }
      );
    }
    });
  }
  onChangeEvent() {
    this.oldPasswordError.check = false;
  }
}
