import { Component, } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    
    private primengConfig: PrimeNGConfig) { }

  title = 'Cuánto Necesito Para Aprobar - Calcula Tu Nota de Forma Fácil';


  ngOnInit() {
    this.primengConfig.ripple = true;

  }
  

}
