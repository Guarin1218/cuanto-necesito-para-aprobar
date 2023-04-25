import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { PrimengModule } from '../primeng/primeng.module';
import { GradesFormComponent } from './components/grades-form/grades-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LandingComponent,
    GradesFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PrimengModule,
    FormsModule,
    SharedModule
  ]
})
export class HomeModule { }
