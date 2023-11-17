import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  productId: any;

  constructor(private fb: FormBuilder, private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      imageUrl: ['']
    });

    this.activatedRoute.params.subscribe(data => {
      console.log(data)
      this.productId = data['id']
    })

    this.productService.getSingleProduct(this.productId).subscribe(res => {
      console.log(res)
      this.productForm.setValue(res);
    });

  }

  submitProductForm() {
    // We are assigning the "id" from the url to a property "productId"
    if(this.productId) {
      this.productService.editProduct(this.productId, this.productForm.value).subscribe(res => {
        console.log(res)
        this.router.navigate(['/products']);
        console.log(this.productForm.controls)
      })
    }
    else {
      console.log('Submiited', this.productForm.value)
      const productObj = this.productForm.value
      this.productService.uploadProduct(productObj).subscribe(res => {
        console.log(res)
        this.router.navigate(['/products'])
    })
    }
  }

}
