import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Import } from '../../shared/models/import/import.model';
import { ImportService } from '../services/import.service';
import { SupplementService } from '../services/supplement.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent {
  viewModeCheck = true;
  supplementList: Import[] = [];
  selectedSupplierId = ''
  addSupplierForm = new FormGroup({});
  destroy$: Subject<boolean> = new Subject<boolean>();
  columnName: string[] = [
    'Code',
    'Date',
    'Supplier',
  ];
  columnToProperty = {
    'Code': 'importCode',
    'Date': 'createdDate',
    'Supplier': 'supplierName'
  };
  constructor(
    private _location: Location,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private supplementService: SupplementService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.addSupplierForm = this.fb.group({
        code: new FormControl(''),
        name: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl(''),
        address: new FormControl('', Validators.required)
      })
      if(params['supplierId']) {
        this.viewModeCheck = true;
        this.selectedSupplierId = params['supplierId'];
        this.getSupplier(params['supplierId']);
        this.getSupplierImport(params['supplierId']);
      }
    });
  }
  
  getSupplier(supplierId: string){
    this.supplierService.getSupplierById(supplierId)
    .subscribe((res) => {
      let temp;
      temp = res;
      this.addSupplierForm = this.fb.group({
        code: new FormControl(temp.supplier.code ? temp.supplier.code : ''),
        name: new FormControl(temp.supplier.name, Validators.required),
        phone: new FormControl(temp.supplier.phone, Validators.required),
        email: new FormControl(temp.supplier.email),
        address: new FormControl(temp.supplier.address, Validators.required)
      })
    })
  }

  onBack() {
      this._location.back();
  }

  getSupplierImport(supplierId: string){
    this.supplementService.getSupplementBySupplierId(supplierId)
    .subscribe((res)=> {
      let temp;
      temp = res
      temp.data = temp.data.map(x => {return x.supplement})
      
      this.supplementList = temp.data.map(({id, code, createdBy, date, supplierId, total}) => {
        return {
          importId: id,
          importCode: code,
          createdBy: createdBy,
          createdDate: new Date(date).toDateString(),
          supplierId: supplierId,
          supplierName: this.addSupplierForm.value.name,
          total: total
        }
      })
    })
  }


  onSave(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: "Add/Update supplier with these information",
      title: "Add/Update a new supplier"
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((submit) => {
        if(submit){
          if(this.selectedSupplierId === ''){
            const data = {
              'code': this.addSupplierForm.value.code,
              'name': this.addSupplierForm.value.name,
              'address': this.addSupplierForm.value.address,
              'phone': this.addSupplierForm.value.phone,
              'email': this.addSupplierForm.value.email
            }
            this.supplierService.addNewSupplier(data)
            .subscribe(res => {
              this.toastr.success('New supplier is successfully added');
              this.onBack();
            })
          } else {
            const data = {
              'id': this.selectedSupplierId, 
              'code': this.addSupplierForm.value.code,
              'name': this.addSupplierForm.value.name,
              'address': this.addSupplierForm.value.address,
              'phone': this.addSupplierForm.value.phone,
              'email': this.addSupplierForm.value.email
            }
            this.supplierService.updateSupplierById(data)
            .subscribe(res => {
              this.toastr.success('The supplier is updated successfully');
              this.onBack();
            })
          }
        }
      })
  }
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    console.log(id)
    this.router.navigate(['/home/scm/supplement-detail'],
    {
      queryParams: { supplementId: id }
    });
  };
}
