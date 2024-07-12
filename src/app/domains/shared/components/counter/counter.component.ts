import { Component, Input, SimpleChange, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration: number = 0;
  @Input({required: true}) message: string = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    // Se usa para valores por defecto
    // NO debe de ser asincrono 
    // Antes del render
    // SOLO corre una vez
    console.log('constructor');
    console.log('-'.repeat(15));
  }

  ngOnChanges(changes: SimpleChanges){
    //antes y durante del render
    // Puede ejecutar cosas asincronas
    console.log('ngOnChanges');
    console.log('-'.repeat(15));
    console.log(changes);
    const duration = changes['duration'];
    console.log(duration);
    if(duration && duration.currentValue !== duration.previousValue){
      this.doSomething();
    }
  }

  ngOnInit(){
    // Antes del render
    // Sólo corre una vez
    // Cosas asincronas, promesa, petición, suscribe,...
    console.log('ngOnInit');
    console.log('-'.repeat(15));
    console.log('duration=>', this.duration);
    console.log('meessage=>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngAfterViewInit(){
    // Después deñ render
    // Corre después del NgOnInit
    // Podemos saber si los hijos del componente ya fueron renderizados
    // Sólo corre una vez

    console.log('ngAfterViewInit');
    console.log('-'.repeat(15));

  }

  ngOnDestroy(){
    // Cuando el componenete se destruye

    console.log('ngOnDestroy');
    console.log('-'.repeat(15));
    window.clearInterval(this.counterRef);

  }

  doSomething(){
    console.log('Change Duration');
  }

}
