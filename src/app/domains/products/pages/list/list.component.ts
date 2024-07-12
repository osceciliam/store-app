import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';

import {ProductComponent} from './../../components/product/product.component';

import {Product } from './../../../shared/models/product.model'
import {HeaderComponent } from './../../../shared/components/header/header.component'
import { CartService } from '../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/models/category.model';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  /* cart = signal<Product[]>([]); */

  /* constructor(){
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'Pro 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=19',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 2',
        price: 200,
        image: 'https://picsum.photos/640/640?r=29',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 3',
        price: 300,
        image: 'https://picsum.photos/640/640?r=39',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 4',
        price: 400,
        image: 'https://picsum.photos/640/640?r=49',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=19',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 2',
        price: 200,
        image: 'https://picsum.photos/640/640?r=29',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 3',
        price: 300,
        image: 'https://picsum.photos/640/640?r=39',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Pro 4',
        price: 400,
        image: 'https://picsum.photos/640/640?r=49',
        creationAt: new Date().toISOString()
      }
    ];
    this.products.set(initProducts);
  } */

  private cartservice = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?:string; 


  addToCart(product: Product){
    console.log('Estamos en el padre');
    console.log(product);
    /* this.cart.update(prevState => [...prevState, product]); */
    this.cartservice.addToCart(product);
  }

  ngOnInit(){
    /* this.getProducts(); */
    this.getCategories();
    
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProducts();
    /* console.log(this.category_id);
    const category_id = changes['category_id'];
    if(category_id){
      this.getProducts();
    }  */
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {

      }
    });
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (category) => {
        this.categories.set(category);
      },
      error: () => {

      }
    });
  }



  


}
