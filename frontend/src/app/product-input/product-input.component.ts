import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent {
  constructor(private productService: ProductService) {}

  @Input() productToEdit: Product = {
    pId: '',
    pName: '',
    price: '',
    quantity: '',
    category: '',
    isPremium: ''
  };
  
  onSubmitForm(form: NgForm) {
    if (this.productToEdit.pId === '') {
    this.productService.addProduct({
      pId: +form.value.pId,
      pName: form.value.pName,
      price: +form.value.price,
      quantity: +form.value.quantity,
      category: form.value.category,
      isPremium: form.value.isPremium==='true' ? true : false
    });
  }
  else {
    this.productService.updateProduct({
      pId: +form.value.pId,
      pName: form.value.pName,
      price: +form.value.price,
      quantity: +form.value.quantity,
      category: form.value.category,
      isPremium: form.value.isPremium==='true' ? true : false
    });
  }
    form.resetForm();
  }
}
