import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  // { path: '', component: ProductsComponent, }, 
  // { path: 'create', component: ProductCreateComponent },
  // { path: 'update/:id', component: ProductCreateComponent },
  // { path: 'admin', component: AdminComponent },
    
  // // WildCard Component
  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
