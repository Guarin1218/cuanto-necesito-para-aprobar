import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  // {
  //   path: '*',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
