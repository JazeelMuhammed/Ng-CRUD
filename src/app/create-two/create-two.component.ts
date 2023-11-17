import { NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-two',
  templateUrl: './create-two.component.html',
  styleUrls: ['./create-two.component.css']
})
export class CreateTwoComponent implements OnInit {

  constructor(private empService: EmployeeServiceService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

    empFormData: any = {}
    empId: any;

    languages: { [key: string]: boolean } = {
      english: false,
      malayalam: false,
      hindi: false
      // Add more properties for additional checkboxes
    };

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(res => {
        this.empId = res['id']
        if(this.empId) {
          this.empService.getSingleEmployee(this.empId).subscribe(res => {
            this.empFormData = res;
          })
        }
  
      });
    }

  onSubmitEmpForm(form: NgForm) {
    console.log(Object.keys(this.languages).find(key => this.languages[key] === true))
    if(this.empId == null) {
      const selectedLang = Object.keys(this.languages).filter(ele => this.languages[ele])
      this.empFormData['languages'] = selectedLang
      this.addEmployeeTwo()
      this.router.navigate(['/'])
    }
    else {
      const selectedLang = Object.keys(this.languages).filter(ele => this.languages[ele])
      this.empFormData['languages'] = selectedLang
      this.updateEmployeeTwo()
      this.router.navigate(['/'])
    }
  }

  addEmployeeTwo() {
    this.empService.addEmployee(this.empFormData).subscribe(res =>{
    console.log('Created', res)
    // this.router.navigate(['/'])
    })
  }

  updateEmployeeTwo() {
    console.log('ID', this.empId)
    this.empService.updateEmployee(this.empId, this.empFormData).subscribe(res => {
    })
  }

}
