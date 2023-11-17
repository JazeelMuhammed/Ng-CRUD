import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  onAddProducts() {
    this.router.navigate(['products/create'])
  }

  ngOnInit(): void {
      this.productService.getProducts().subscribe((res: Product[])=> {
        console.log(res)
        this.productList = res;
      })
  }

  getProductDetails(proId: any) {
    this.productService.getSingleProduct(proId).subscribe(res => {
      console.log(res)
    })
  }

  editProductNavigate(proId: any) {
    this.router.navigate([`/products/update/${proId}`])
  }

}
