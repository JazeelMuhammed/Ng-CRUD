import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productList: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log('URL', this.router.url.includes('admin'))
    this.productService.getProducts().subscribe((res: Product[])=> {
      console.log(res)
      this.productList = res;
    })
  }

  editProductNavigate(proId: any) {
    this.router.navigate([`/products/update/${proId}`])
  }

  deleteMsg: string = ''
  deleted: boolean = false;

  onDeleteProduct(proId: any) {
    this.productService.deleteProduct(proId).subscribe(res => {
      console.log(res)
      this.deleted = true;
      this.deleteMsg = 'Item deleted successfully!';
    });
  }

}
