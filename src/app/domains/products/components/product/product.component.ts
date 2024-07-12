import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { ReversePipe } from '../../../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
/*   @Input({required: true}) img: string = '';
  @Input({required: true}) price: number = 0;
  @Input({required: true}) title: string = ''; */
  @Input({ required:true }) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler(){
    console.log('Click from child');
    /* this.addToCart.emit('hola, este es un mensaje desde el hijo' + this.product.title); */
    this.addToCart.emit(this.product);
  }

}
