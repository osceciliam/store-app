import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {

  elemnt = inject(ElementRef);

  constructor() { }

  ngOnInit(){
    this.elemnt.nativeElement.style.backgroundColor = "red";
  }

}
