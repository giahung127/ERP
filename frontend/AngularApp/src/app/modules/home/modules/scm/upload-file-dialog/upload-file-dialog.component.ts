import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExcelService } from '../../shared/services/excel.service';
import * as XLSX from 'xlsx';
import { CategoryService } from '../services/category.service';
import { Category } from '../../shared/models/category/category.model';
interface ImportProduct {
    'categoryCode': string;
    'productCode':string;
    'productName': string;
    'price':string;
    'description': string;
    'is_expire': string;
  }
@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})

export class UploadFileDialogComponent {
  file
  arrayBuffer
  filelist
  error = 0
  rowError: number[] = []
  validProduct: ImportProduct[] = []
  editMode = false;
  categoryList: Category[] = [];
  addCategoryForm = new FormGroup({});
  excelTemplate = [{
    'categoryCode': '',
    'productCode':'',
    'productName': '',
    'price':'',
    'description': '',
    'is_expire': ''
  }];
  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>,
    private fb: FormBuilder,
    private excelService: ExcelService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.getCategoryList();
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
  getCategoryList(){
  this.categoryService.getAllCategory()
      .subscribe((res) => {
        let data;
        data = res
        this.categoryList = data.map(({ id,code,  name, level, parentId})=>{
          return {
            'categoryId': id,
            'categoryName': name,
            'code': code,
            'description': '',
            'level': level,
            'parentId': parentId !== null ? parentId : ''
          }
        })
      })
    }
  downloadExcelTemp() {
    this.excelService.exportExcel(this.excelTemplate, 'excelTemplate');
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
        this.preProcessData(XLSX.utils.sheet_to_json(worksheet,{raw:true}))   
    }    
  }

  preProcessData(data: ImportProduct[]){
    const categoryCodeList = this.categoryList.map((category) => {return category.code;});
    let index = 1;
    this.rowError = []
    this.error = 0;
    this.validProduct = [];
    data.forEach((product)=> {
      if(categoryCodeList.includes(product.categoryCode) && product.productName !== '' && typeof(product.price) === 'number' && typeof(product.is_expire) === 'boolean'){
        this.validProduct.push(product);
      } else {
        this.error += 1;
        this.rowError.push(index);
      }
      index += 1;
    })
  }

  onSave() {
    const data = this.validProduct.map((product)=>{
      return {
        'code': product.productCode,
        'name': product.productName,
        'category_id': this.categoryList.find(x => {return x.code === product.categoryCode})?.categoryId,
        'price': product.price,
        'description': product.description,
        'is_expire': product.is_expire
      }
    })
    console.log(data)
    this.dialogRef.close(data);
  }
}
