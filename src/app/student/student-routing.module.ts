import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { RegisterEditComponent } from './register-edit/register-edit.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StudentLoginComponent } from './student-login/student-login.component';


const routes: Routes = [
  { path: 'home', component: StudentListComponent },
  { path: 'create', component: RegisterEditComponent },
  { path: 'update/:id', component: RegisterEditComponent },
  { path: 'details/:id', component: StudentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  
  exports: [RouterModule]
})
export class StudentRoutingModule { }
