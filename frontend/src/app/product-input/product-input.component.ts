import { Component, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent implements OnChanges {
  constructor(private productService: ProductService) {}

  @Input() productToEdit: Product | undefined;

  form: NgForm | undefined;

  ngOnChanges() {
    if (this.productToEdit) {
      console.log(this.productToEdit);
      if (this.form) {
        this.form.setValue({
          pId: this.productToEdit.pId,
          pName: this.productToEdit.pName,
          price: this.productToEdit.price,
          quantity: this.productToEdit.quantity,
          category: this.productToEdit.category,
          isPremium: this.productToEdit.isPremium
        });
      }
    }
  }
  
  onAddProduct(form: NgForm) {
    this.form = form;
    if (form.invalid) {
      return;
    }
    this.productService.addProduct({
      pId: this.form.value.pId,
      pName: this.form.value.pName,
      price: this.form.value.price,
      quantity: this.form.value.quantity,
      category: this.form.value.category,
      isPremium: this.form.value.isPremium
    });
  }
}
