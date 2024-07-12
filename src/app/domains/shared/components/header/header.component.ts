import { Component, Input, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import{ RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);

  toogleSideMenu(){
    this.hideSideMenu.update(prevState => !prevState);
  }

  /* @Input({ required: true }) cart: Product[] = []; */
  private cartservice = inject(CartService);
 /*  Se usa "inject" para iyectar el serviccio en sustitución del Input  */

  /* calcTotal(){
    return this.cart.reduce((total,product) => total + product.price, 0);
  }

  total = signal(0);

  ngOnChanges(changes: SimpleChanges){
    const cart = changes['cart'];
    if(cart){
      this.total.update( () => this.calcTotal());
    }
  } */

  cart = this.cartservice.cart;
  total = this.cartservice.total;


}
