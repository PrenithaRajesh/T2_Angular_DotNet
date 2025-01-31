import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductToAdd} from './product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http
      .get<Product[]>('http://localhost:5000/api/Product/GetProducts')
      .subscribe((products: Product[]) => {
        let productsArray: Product[] = [];
        for (let key in products) {
          if (products.hasOwnProperty(key)) {
            productsArray.push(products[key]);
          }
        }
        this.products.next(productsArray);
      });
  }

  addProduct(product: ProductToAdd) {
    return this.http
      .post<Product>('http://localhost:5000/api/Product/AddProduct', product).subscribe(() => {
        this.getProducts();
      });
  }

  updateProduct(product: ProductToAdd) {
    return this.http
      .put<Product>('http://localhost:5000/api/Product/UpdateProduct', product).subscribe(() => {
        this.getProducts();
      });
  }

  deleteProduct(pId: number) {
    return this.http
      .delete<Product>('http://localhost:5000/api/Product/DeleteProduct/' + pId).subscribe(() => {
        this.getProducts();
      });
  }
}
