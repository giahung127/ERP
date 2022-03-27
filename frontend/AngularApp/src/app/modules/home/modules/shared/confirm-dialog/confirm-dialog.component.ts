import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  message = '';
  buttonColor = 'primary';
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
      if (data.title) {
          this.title = data.title;
      }
      if (data.message) {
          this.message = data.message;
      }
      if (data.buttonColor) {
          this.buttonColor = data.buttonColor;
      }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  confirm() {
      this.dialogRef.close(true);
  }

  cancel() {
      this.dialogRef.close(false);
  }

}
