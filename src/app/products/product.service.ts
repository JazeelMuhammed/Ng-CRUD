import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  getSingleProduct(proId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/products/${proId}`)
  }

  uploadProduct(data: Product): Observable<any> {
    return this.http.post('http://localhost:3000/products', data)
  }

  editProduct(proId: number, data: Product): Observable<any> {
    return this.http.put(`http://localhost:3000/products/${proId}`, data)
  }

  deleteProduct(proId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/products/${proId}`)
  }

}
