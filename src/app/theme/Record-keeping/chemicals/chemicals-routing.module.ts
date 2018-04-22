import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChemicalsComponent } from './chemicals.component';

const routes: Routes = [
  {
    path: '',
    component: ChemicalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChemicalsRoutingModule { }
