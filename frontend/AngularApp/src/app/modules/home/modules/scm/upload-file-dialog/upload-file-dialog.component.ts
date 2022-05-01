import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExcelService } from '../../shared/services/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent {
  file
  arrayBuffer
  filelist
  editMode = false;
  addCategoryForm = new FormGroup({});excelTemplate = [{
    'productCode':'',
    'productName': '',
    'price':'',
    'categoryId': '',
    'categoryName': '',
    'description': ''
  }];
  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    private fb: FormBuilder,
    private excelService: ExcelService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    if(data.selectedCategoryId !== ''){
      this.editMode = true;
      this.addCategoryForm = this.fb.group({
        categoryName: new FormControl('', Validators.required),
        parentCategory: new FormControl('')
      })
    } else{
      this.addCategoryForm = this.fb.group({
        categoryName: new FormControl('', Validators.required),
        parentCategory: new FormControl('')
      })
    }
  }
  downloadExcelTemp() {
    this.excelService.exportExcel(this.excelTemplate, 'excelTemplate');
  }

  onSave() {
      this.dialogRef.close(this.addCategoryForm.value);
  }

  onCancel() {
      this.dialogRef.close();
  }

  addfile(event){
    this.file= event.target.files[0];     
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];    
        console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true})); 
        console.log(this.file)   
    }    
  }
}
