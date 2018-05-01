import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeightCheckComponent } from './weight-check.component';

const routes: Routes = [
  {
    path: '',
    component: WeightCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeightCheckRoutingModule { }
