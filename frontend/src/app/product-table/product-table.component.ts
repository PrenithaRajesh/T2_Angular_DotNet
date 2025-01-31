import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit, OnDestroy{
  constructor(private productService: ProductService) {}

  @Output() productSelected = new EventEmitter<Product>();

  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts();
    this.productService.products.subscribe((products) => {
      this.products = products;
    });
  }

  onSelect(product: Product) {
    if(confirm('Are you sure you want to edit this product?')){
      console.log('Product emitted: ', product);
      this.productSelected.emit(product);
    }
  }

  ngOnDestroy() {
    this.productService.products.unsubscribe();
  }
}
