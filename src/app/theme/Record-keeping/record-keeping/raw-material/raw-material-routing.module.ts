import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RawMaterialComponent} from './raw-material.component';

const routes: Routes = [
  {
    path: '',
    component: RawMaterialComponent,
    data: {
      title: 'RawMaterial',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule { }
