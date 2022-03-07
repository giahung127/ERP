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
    let data;
    this.employeeService.getAllEmployee().subscribe(res => {
      data = res
      this.employeeList = data.map(({ employeeId, name, position, phone, department})=>{
      return {
        'employeeId': employeeId,
        'name': name,
        'position': position,
        'phone': phone,
        'department': department
      }
    })
    console.log(data);
  })
  }
  // employeeList: Employee[] = [
  //   new Employee('p001','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p002','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p003','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p004','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p005','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p006','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p007','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p008','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p009','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p010','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p011','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p012','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p013','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p014','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p015','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p016','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p017','Nguyen Van A', '012346789', 'Software Enginering', 'Intership'),
  //   new Employee('p018','Nguyen Van A', '012346789', 'Software Enginering', 'Intership')
  // ];
  columnName: string[] = [
    'EmployeeId',
    'Name',
    'Position',
    'Phone',
    'Department'
  ];
  columnToProperty = {
    'EmployeeId': 'employeeId',
    'Name': 'name',
    'Position': 'position',
    'Phone': 'phone',
    'Department': 'department'
  };
  onAddEmployee: () => void = () => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/hrm/employee-detail']);
  };
  onViewClick: (id: string) => void = (id: string) => {
    // console.log("On View Click: ", id);
    this.router.navigate(['/home/hrm/employee-detail', id]);
  };
  onEditClick: (id: string) => void = (id: string) => {
      this.router.navigate(['/home/hrm/employee-detail', id], {
          queryParams: { employeeId: id }
      });
  };

  onDeleteClick: (id: string) => void = (id: string) => {
  };
}
