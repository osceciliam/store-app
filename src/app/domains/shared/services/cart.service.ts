import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cart = signal<Product[]>([]);

  constructor() { }

  addToCart(product: Product){
    this.cart.update(state => [...state, product]);
    console.log('Probando cart', this.cart);
    console.log('probando el total', this.total);
  }

  total = computed(()=>{
    const cart = this.cart();
    return cart.reduce((total,product) => total + product.price, 0);
    
  });




}

