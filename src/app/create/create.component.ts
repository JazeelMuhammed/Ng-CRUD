import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  empForm!: FormGroup;
  empId: any;

  constructor(private fb: FormBuilder, 
    private empService: EmployeeServiceService, 
    private activatedRoute: ActivatedRoute, private router: Router){ } 

  ngOnInit(): void {
    this.empForm = this.fb.group({
      registerNum: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      languages: this.fb.array([]),
      // agreeBox: ['']
    });

    this.activatedRoute.params.subscribe(data => {
      console.log('DATA', data['id'])
      this.empId = data['id']
    });

    const languageOptions = [
      { label: 'English', value: 'english' },
      { label: 'Malayalam', value: 'malayalam' },
      { label: 'Hindi', value: 'hindi' }
    ];

    if(this.empId){
      this.empService.getSingleEmployee(this.empId).subscribe((res: any)=> {
        console.log('GEt employee', res)
        this.empForm.setValue(res);
      })
    }
  }

  private initializeLanguages(options: { label: string, value: string[]}): void {
    const languageArr = this.empForm.get('languages') as FormArray
    console.log(options)
  }

  get languages(): FormArray {
    return this.empForm.get('languages') as FormArray
  }

  addEmployeeForm() {
    // if id is present we update
    console.log(this.languages)
    if(this.empId) {
      if(this.empForm.valid){
        this.empService.updateEmployee(this.empId, this.empForm.value).subscribe(res => {
          this.router.navigate(['/'])
        })
      }
    }
    // else create
    else{
      if(this.empForm.valid){
        let empObj = this.empForm.value
        let empId = this.empForm.value.id
        empObj['id'] = empId
        this.empService.addEmployee(empObj).subscribe(res => {
          console.log(res)
          alert('Employee added successfully')
          this.empForm.reset()
          this.router.navigate(['/'])
        })
      }
    }
    
  }

  
  
}
