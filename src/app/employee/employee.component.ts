import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { discardPeriodicTasks } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeList: Employee[] = [];
  

  constructor(private empService: EmployeeServiceService,
    private router: Router){ }

  ngOnInit() {
    this.empService.getEmployees().subscribe((data: Employee[]) => {
      console.log(data)
      this.employeeList = data
      console.log(data)
    });
  }

  onAddEmployee() {
    return this.router.navigate(['/create'])
  }

  onAddEmployeeTwo() {
    return this.router.navigate(['create-two'])
  }

  getEmployee(empId: number) {
    return this.empService.getSingleEmployee(empId).subscribe(res => {
      console.log(res)
    })
  }

  updateEmployeeNavigator(empId: number){
    return this.router.navigate([`/update/${empId}`])
  }
  updateEmployeeNavigatorTwo(empId: number){
    return this.router.navigate([`/update-two/${empId}`])
  }

  onDeleteEmployee(empId: number) {
    console.log(empId)
    console.log('Remaining Employees List', this.employeeList)
    return this.empService.deleteEmployee(empId).subscribe(res => {
      console.log(res)
      alert('Employee deleted successfully!')
      this.router.navigate(['/'])
    })
  }

}
