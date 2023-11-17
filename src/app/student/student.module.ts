import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { RegisterEditComponent } from './register-edit/register-edit.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { StudentListComponent } from './student-list/student-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StudentLoginComponent } from './student-login/student-login.component';


@NgModule({
  declarations: [
    StudentComponent,
    RegisterEditComponent,
    StudentDetailsComponent,
    StudentListComponent,
    StudentLoginComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class StudentModule { }
