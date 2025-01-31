import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css'],
})
export class ProductInputComponent implements OnChanges, OnInit {
  constructor(private productService: ProductService) {}

  product: Product = {
    pId: 0,
    pName: '',
    price: 0,
    quantity: 1,
    category: '',
    isPremium: false
  };

  @Input() productToEdit: Product | undefined;

  ngOnInit() {
    this.productService.products.subscribe((products) => {
      this.product.pId = products.length + 1;  
    });
  }

  ngOnChanges() {
    if (this.productToEdit) {
      this.product = { ...this.productToEdit };
    }
  }

  onSubmitForm(form: NgForm) {
    if (form.valid) {
      if (this.productToEdit !== undefined) {
        console.log('Product to update: ', this.product.isPremium);
        this.productService.updateProduct(this.product);
      } else {
        console.log('Product to add: ', this.product.isPremium);
        this.productService.addProduct(this.product);
      }
      form.reset();
      this.productToEdit = undefined;
    }
  }
}
