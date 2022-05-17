import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../shared/models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employeeList: Employee[] = []
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.getListEmployee()
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
    })
  }
  columnName: string[] = [
    'Code',
    'Name',
    'Role',
    'Phone'
  ];
  columnToProperty = {
    'Code': 'code',
    'Name': 'name',
    'Role': 'role',
    'Phone': 'phone'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/hrm/employee-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/hrm/employee-detail'],{
      queryParams: { employeeId: id }
    });
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/hrm/employee-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
