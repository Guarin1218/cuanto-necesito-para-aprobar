import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ToggleButtonThemeComponent } from './toggle-button-theme/toggle-button-theme.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FooterComponent,
    ToggleButtonThemeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FooterComponent,
    ToggleButtonThemeComponent
  ]
})
export class SharedModule { }
