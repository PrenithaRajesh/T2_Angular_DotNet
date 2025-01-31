import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedProduct: Product = {
    pId: '',
    pName: '',
    price: '',
    quantity: '',
    category: '',
    isPremium: '',
  };

  onProductSelected(product: Product) {
    this.selectedProduct = { ...product };
  }
}
