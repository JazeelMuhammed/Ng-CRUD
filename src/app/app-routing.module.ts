import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CreateComponent } from './create/create.component';
import { CreateTwoComponent } from './create-two/create-two.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';


const routes: Routes = [
  // { path: 'create', component: CreateComponent },
  // { path: 'update/:id', component: CreateComponent },

  // { path: 'create-two', component: CreateTwoComponent },
  // { path: 'update-two/:id', component: CreateTwoComponent },

  // { path: 'register', component: RegisterComponent },
  
  // { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
