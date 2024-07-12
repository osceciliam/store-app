import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product.model';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export default class ProductDetailComponent {

  @Input() id?: string;
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private sanitizer = inject(DomSanitizer);
  product = signal<Product | null>(null);
  cover = signal('');
  

  ngOnInit(){
    if(this.id){
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
          console.log('aquí el normal:', product);
          /* this.product.set(product); */
          const sanitizedProduct: Product = {
            ...product,
            sanitizedImageUrls: product.images.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
          };
          this.product.set(sanitizedProduct);
          if(product.images.length >0){
            this.cover.set(product.images[0]);
          }
        }
      });
    }
  }

  changeCover(newImage: string){
    this.cover.set(newImage);
    console.log('se cambia por:', newImage)
  }

  addToCart(){
    const product = this.product();
    if(product){
      this.cartService.addToCart(product);
    }        
  }

  



}
