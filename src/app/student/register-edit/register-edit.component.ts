import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { District } from '../student.model';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { UniqueEmailValidator } from '../unique-email-validator.directive';

@Component({
  selector: 'app-register-edit',
  templateUrl: './register-edit.component.html',
  styleUrls: ['./register-edit.component.css']
})
export class RegisterEditComponent implements OnInit {
  studentForm!: FormGroup;
  districtList : District[] = [];

  studentId!: number;

  subjectList: string[] = ['Maths', 'Science', 'English', 'EV', 'Malayalam'];

  selectedSubjects: any;

  constructor(private fb: FormBuilder, 
    private studentService: StudentService, 
    private activatedRoute: ActivatedRoute, private router: Router) 
    {
      this.studentForm = this.fb.group({
        id: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
            ),
          ],
          [UniqueEmailValidator.createValidator(this.studentService)]
          // Remove the validator here
        ],
        
        address: ['', Validators.required],
        district: ['', Validators.required],
        // checkboxes: this.fb.array(checkboxControls),
        subjects: this.fb.array([], [Validators.required, this.minSelectedSubjects(1)])
      });
  }

  // selectedSubs: string[] = [];

  // // code for minimum selection of 1 subject
  // minSelectedSubjects(min: number) {
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     this.selectedSubs = control.value as string[];
  //     if (this.selectedSubs && this.selectedSubs.length >= min) {
  //       console.log('Selected subs', this.selectedSubs.length);
  //       return null;
  //     }
  //     // Since it return true or false
  //     return { minSelectedSubjects: true };
  //   };
  // }


  ngOnInit() {
    this.studentService
      .getDistricts()
      .subscribe((districtData: District[]) => {
        this.districtList = districtData;
      });

    this.activatedRoute.params.subscribe((res) => {
      this.studentId = res['id'];

      if (this.studentId) {
        this.studentService
          .getSingleStudent(this.studentId)
          .subscribe((res) => {
            const subjectsArray = this.studentForm.get('subjects') as FormArray;

            res.subjects.filter((subject: string | null) => subject !== null).forEach((subject: string) => {
              subjectsArray.push(new FormControl(subject));
            });

            this.studentForm
              .get('email')
              ?.setAsyncValidators(
                UniqueEmailValidator.createValidator(
                  this.studentService,
                  res.email
                )
              );

            this.studentForm.setValue(res);
            // console.log('Existing Form Details:', studentData); // Log the existing form details
          });
      }
    });
  }
  // End of ngOnInit

  // To track the true or false condition of checkbox
  handleChange(e: any){
    let subjectArr = this.studentForm.get('subjects') as FormArray
    if(e.target.checked) {
      // pushing the checked checkbox into an Form Array
      subjectArr.push(new FormControl(e.target.value));
    }
    else {
      let i=0;
      subjectArr.controls.forEach((sub: any) => {
        // if current subject value and event triggered element value are same
        if(sub.value === e.target.value) {
          // then we remove it from the array
          subjectArr.removeAt(i)
          return;
        }
        i++;
      });
    }
  }

  requiredValidatorText = 'Field must not be empty';
  emailValidator = 'Invalid email format';
  
  isSubmitted: boolean = false;

  isChecked(subject: string): boolean {
    const subjectsArray = this.studentForm.get('subjects') as FormArray;
    return subjectsArray.controls.some((control) => control.value === subject);
  }

  submitFormData() {
    this.isSubmitted = true;
    if(this.studentForm.valid){
      if(this.studentId) {
        this.studentService.editStudent(this.studentId, this.studentForm.value).subscribe(res => {
          this.showSuccessAlert();
          this.router.navigate([`details/${this.studentId}`]);
        });
      }
      else {
        this.studentService.addStudent(this.studentForm.value).subscribe(res => {
          this.showSuccessAlert();
          this.router.navigate(['home']);
        });
      }
    }
  }

  // reset button
  resetSubmissionForm() {
    this.studentForm.reset();
    this.isSubmitted = false; // Clear the submitted flag
    // Clear the asynchronous validators of email
    this.clearAsyncValidators(); 
    // Adding Checkbox minSelectedSubjects validation as true after Form Resetting.
    const subjectsArray = this.studentForm.get('subjects') as FormArray;
    // To clear the subjectsArray after resetting.
    subjectsArray.clear();
    subjectsArray.setErrors({ 'minSelectedSubjects': true }); 
  }
  
  clearCheckboxValidation() {
    const subjectsArray = this.studentForm.get('subjects') as FormArray;
    subjectsArray.setErrors({ 'minSelectedSubjects': true });
  }

  minSelectedSubjects(min: number) {
    // here return type is a checkbox with controls: boolean
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const selectedSubjects = control.value as string[];
      if (selectedSubjects && selectedSubjects.length >= min) {
        return null;
      }
      return { 'minSelectedSubjects': true };
    };
  }

  // Clear asynchronous validators for email
  clearAsyncValidators() {
    const emailControl = this.studentForm.get('email');
    if (emailControl) {
      emailControl.clearAsyncValidators();
      emailControl.updateValueAndValidity();
    }
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Good job!',
      text: 'Student added successfully',
      icon: 'success',
    });
  }

}
